import { Button } from "@/components/ui/button";
import { getAppointment } from "@/features/userapp/db/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;
const Success = async ({ searchParams }: SearchParamProps) => {
	const isUpdated = (searchParams?.isUpdated as string) === "true" || false;
	const appointmentId = (searchParams?.appointmentId as string) || "";
	const appointment = await getAppointment(appointmentId);
	const doctor = appointment?.primaryPhysician?.$id
		? appointment?.primaryPhysician
		: null;

	return (
		<div className="flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				<Link href="/">
					<Image
						src="/assets/icons/logo-full.svg"
						height={1000}
						width={1000}
						alt="logo"
						className="h-10 w-fit"
					/>
				</Link>
				<section className="flex flex-col items-center">
					<Image
						src="/assets/gifs/success.gif"
						height={300}
						width={280}
						alt="success"
					/>
					<h2 className="header mb-6 max-w-[600px] text-center">
						Your <span className="text-green-500">appointment request</span> has
						been successfully {`${isUpdated ? "updated" : "submitted"}`}!
					</h2>
					<p>We will be in touch shortly to confirm.</p>
				</section>
				<section className="request-details">
					<p>Requested appointment details:</p>
					{doctor && (
						<div className="flex items-center gap-3">
							<Image
								src={doctor?.profileImgUrl || ""}
								alt="doctor"
								width={100}
								height={100}
								className="size-6"
							/>
							<p className="whitespace-nowrap">Dr. {doctor?.name}</p>
						</div>
					)}
					<div className="flex gap-2">
						<Image
							src="/assets/icons/calendar.svg"
							height={24}
							width={24}
							alt="calendar"
						/>
						<p>{formatDateTime(appointment.schedule).dateTime}</p>
					</div>
				</section>
				<div className="flex gap-6">
					<Button variant="outline" className="shad-primary-btn" asChild>
						<Link href={`/fortis/patient/appointment`}>New Appointment</Link>
					</Button>
					<Button variant="ghost" className="shad-gray-btn" type="button">
						<Link
							href={`/fortis/patient/appointment?appointmentId=${appointment?.$id}`}>
							Update Appointment
						</Link>
					</Button>
				</div>

				<p className="copyright py-12">© 2024 CarePulse</p>
			</div>
		</div>
	);
};

export default Success;
