declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled" | "completed";

declare type AppointmentActionType =
	| "create"
	| "update"
	| "cancel"
	| "schedule"
	| "complete";
