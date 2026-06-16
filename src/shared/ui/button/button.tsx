import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type ButtonProps = {
	type?: "button" | "submit";
	children: ReactNode;
	icon?: LucideIcon;
	variant?: "primary" | "secondary";
	disabled?: boolean;
	onClick?: () => void;
};

export function Button({ type = "button", children, icon: Icon, variant = "primary", disabled, onClick }: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				"flex h-12 w-full items-center justify-center gap-2 rounded-control px-4 text-[15px] font-semibold shadow-control transition-colors",
				variant === "primary" && "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
				variant === "secondary" && "border border-border bg-control text-control-foreground hover:bg-control-muted",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
				"disabled:cursor-not-allowed disabled:opacity-60"
			)}
		>
			{Icon ? <Icon className="size-5" /> : null}
			<span>{children}</span>
		</button>
	);
}
