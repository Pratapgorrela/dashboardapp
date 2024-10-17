"use server";

import { ID, Query } from "node-appwrite";
import { databases, dbConfig, messaging } from "../types/appwrite.config";
import { formatDateTime, parseStringify } from "../types/utils";
import { Appointment } from "@/types/appwrite.type";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
	appointment: CreateAppointmentParams
) => {
	try {
		const newAppointment = await databases.createDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			appointment
		);
		return parseStringify(newAppointment);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			appointmentId
		);
		return parseStringify(appointment);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const getRecentAppointmentList = async () => {
	try {
		const appointments = await databases.listDocuments(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc("$createdAt")]
		);

		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			cancelledCount: 0,
		};

		const counts = (appointments.documents as Appointment[]).reduce(
			(acc, appointment) => {
				if (appointment.status === "scheduled") {
					acc.scheduledCount += 1;
				} else if (appointment.status === "pending") {
					acc.pendingCount += 1;
				} else if (appointment.status === "cancelled") {
					acc.cancelledCount += 1;
				}
				return acc;
			},
			initialCounts
		);

		const data = {
			totalCount: appointments.total,
			...counts,
			documents: appointments.documents,
		};
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const updateAppointment = async ({
	appointmentId,
	userId,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updateAppointment = await databases.updateDocument(
			dbConfig.DATABASE_ID!,
			dbConfig.APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		);
		if (!updateAppointment) {
			throw new Error(`Appointment not found! ${type}`);
		}

		const smsMessage = `Hi, it's Curepulse. ${
			type === "schedule"
				? `Your appointment has been scheduled for ${
						formatDateTime(appointment.schedule!).dateTime
				  } with Dr. ${appointment.primaryPhysician}`
				: `We regret to inform you that your appointment has been cancelled for following reason: ${appointment.cancellationReason}`
		}  `;

		await sendSMSNotification(userId, smsMessage);

		revalidatePath("/admin");
		return parseStringify(updateAppointment);
	} catch (error: unknown) {
		console.log(error);
	}
};

export const sendSMSNotification = async (userId: string, content: string) => {
	try {
		const message = await messaging.createSms(
			ID.unique(),
			content,
			[],
			[userId]
		);
		return parseStringify(message);
	} catch (error: unknown) {
		console.log(error);
	}
};
