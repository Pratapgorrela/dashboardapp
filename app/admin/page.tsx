import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.type";
import Image from "next/image";
import Link from "next/link";

const Admin = async () => {
	const appointments = await getRecentAppointmentList();

	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<header className="admin-header">
				<Link href="/" className="cursor-pointer">
					<Image
						src="/assets/icons/logo-full.svg"
						alt="Logo"
						height={32}
						width={162}
						className="h-8 w-fit"
					/>
				</Link>
				<p className="text-16-semibold">Admin Dashboard</p>
			</header>
			<main className="admin-main">
				<section className="w-full space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">
						Start the day with managing new appointments.
					</p>
				</section>
				<section className="admin-stat">
					<StatCard
						type="appointments"
						count={appointments?.scheduledCount || 0}
						label="Scheduled appointments"
						icon="/assets/icons/appointments.svg"
					/>
					<StatCard
						type="pending"
						count={appointments?.pendingCount || 0}
						label="Pending appointments"
						icon="/assets/icons/pending.svg"
					/>
					<StatCard
						type="cancelled"
						count={appointments?.cancelledCount || 0}
						label="Cancelled appointments"
						icon="/assets/icons/cancelled.svg"
					/>
				</section>
				<DataTable
					columns={columns}
					data={(appointments?.documents as Appointment[]) || []}
				/>
			</main>
		</div>
	);
};

export default Admin;