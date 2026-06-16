import type { ChangeEvent } from "react";

import { cn } from "@/shared/lib/utils";

type CommonInputType = "text" | "number";

export type CommonInputProps = {
	type?: CommonInputType;
	name?: string;
	value?: string | number;
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	onChange?: (value: string) => void;
	onBlur?: () => void;
};

const sanitizeNumberValue = (value: string) => {
	const cleanedValue = value.replace(",", ".").replace(/[^\d.]/g, "");
	return cleanedValue.match(/^\d*\.?\d?/)?.[0] ?? "";
};

export function CommonInput({ type = "text", name, value, placeholder, disabled, error, onChange, onBlur }: CommonInputProps) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = type === "number" ? sanitizeNumberValue(event.target.value) : event.target.value;

		onChange?.(nextValue);
	};

	return (
		<input
			name={name}
			type={type === "number" ? "text" : type}
			inputMode={type === "number" ? "decimal" : undefined}
			value={value ?? ""}
			placeholder={placeholder}
			disabled={disabled}
			aria-invalid={error}
			onChange={handleChange}
			onBlur={onBlur}
			className={cn(
				"h-[var(--control-height)] w-full rounded-control border border-control-border bg-control px-3 text-[15px] text-control-foreground shadow-control outline-none transition-colors placeholder:text-muted-foreground",
				"focus-visible:border-control-focus focus-visible:ring-2 focus-visible:ring-ring/20",
				"disabled:cursor-not-allowed disabled:opacity-60",
				"aria-[invalid=true]:border-destructive"
			)}
		/>
	);
}
