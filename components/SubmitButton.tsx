import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/types/utils";

interface ButtonProps {
	isLoading: boolean;
	className?: string;
	children: React.ReactNode;
}

const SubmitButton = ({ isLoading, children, className = "" }: ButtonProps) => {
	return (
		<Button
			type="submit"
			disabled={isLoading}
			className={cn("shad-primary-btn w-full", className)}>
			{isLoading ? (
				<div className="flex items-center gap-4">
					<Image
						src={"/assets/icons/loader.svg"}
						alt="loader"
						width={24}
						height={24}
						className="animate-spin"
					/>
					Loading...
				</div>
			) : (
				children
			)}
		</Button>
	);
};

export default SubmitButton;
