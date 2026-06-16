import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type FormFieldProps = {
	label: string;
	icon: LucideIcon;
	children: ReactNode;
	error?: string;
	hint?: string;
	valueText?: string;
	disabled?: boolean;
};

export function FormField({ label, icon: Icon, children, error, hint, valueText, disabled }: FormFieldProps) {
	return (
		<label className={disabled ? "block opacity-55" : "block"}>
			<span className="mb-3 flex items-center justify-between gap-3 text-[13px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
				<span className="flex min-w-0 items-center gap-2">
					<Icon className="size-4 shrink-0 text-primary" />
					<span className="truncate">{label}</span>
				</span>
				{valueText ? <span className="shrink-0 text-base tracking-normal text-primary">{valueText}</span> : null}
			</span>
			{children}
			{hint ? <span className="mt-2 block rounded-md bg-primary/10 p-3 text-sm leading-5 text-primary">{hint}</span> : null}
			{error ? <span className="mt-2 block text-xs font-medium text-destructive">{error}</span> : null}
		</label>
	);
}
