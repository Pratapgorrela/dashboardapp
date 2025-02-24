import { User, Mail, X, CalendarDays } from "lucide-react";

export const enum ICON_NAMES {
	user = "USER",
	email = "EMAIL",
	close = "CLOSE",
	calendar = "CALENDAR",
}

export const getIcon = (name: string, rest?: unknown) => {
	switch (name) {
		case ICON_NAMES.user:
			return (
				<User
					stroke="#CDE9DF"
					strokeWidth="1.5"
					className="self-center ml-2"
					{...(rest || {})}
				/>
			);
		case ICON_NAMES.email:
			return (
				<Mail
					stroke="#CDE9DF"
					strokeWidth="1.5"
					className="self-center ml-2"
					{...(rest || {})}
				/>
			);
		case ICON_NAMES.close:
			return <X {...(rest || {})} />;
		case ICON_NAMES.calendar:
			return (
				<CalendarDays
					height={24}
					width={24}
					className="self-center ml-2"
					{...(rest || {})}
				/>
			);
		default:
			return <></>;
	}
};

export const getIcons = (icons: ICON_NAMES[], rest?: unknown) => {
	return icons?.reduce((acc, icon) => {
		acc[icon] = getIcon(icon, rest);
		return acc;
	}, {});
};
