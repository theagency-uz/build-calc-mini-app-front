import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export type SelectOption = {
	id: string;
	name: string;
};

export type SelectProps = {
	name?: string;
	value?: string;
	placeholder?: string;
	options: SelectOption[];
	disabled?: boolean;
	error?: boolean;
	onChange?: (value: string) => void;
	onBlur?: () => void;
};

export function Select({
	name,
	value,
	placeholder = "Выберите значение",
	options,
	disabled,
	error,
	onChange,
	onBlur,
}: SelectProps) {
	return (
		<SelectPrimitive.Root name={name} value={value} disabled={disabled} onValueChange={onChange}>
			<SelectPrimitive.Trigger
				aria-invalid={error}
				onBlur={onBlur}
				className={cn(
					"flex h-[var(--control-height)] w-full items-center justify-between gap-2 rounded-control border border-control-border bg-control px-3 text-left text-[15px] text-control-foreground shadow-control outline-none transition-colors",
					"focus-visible:border-control-focus focus-visible:ring-2 focus-visible:ring-ring/20",
					"disabled:cursor-not-allowed disabled:opacity-60",
					"data-[placeholder]:text-muted-foreground",
					"aria-[invalid=true]:border-destructive"
				)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDown className="size-4 text-muted-foreground" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					position="popper"
					className="z-50 max-h-80 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-control border border-border bg-popover text-popover-foreground shadow-popover"
				>
					<SelectPrimitive.Viewport className="p-1">
						{options.map((option) => (
							<SelectPrimitive.Item
								key={option.id}
								value={option.id}
								className="relative flex min-h-9 cursor-default select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm outline-none focus:bg-control-muted"
							>
								<span className="absolute left-2 flex size-4 items-center justify-center">
									<SelectPrimitive.ItemIndicator>
										<Check className="size-4" />
									</SelectPrimitive.ItemIndicator>
								</span>
								<SelectPrimitive.ItemText>{option.name}</SelectPrimitive.ItemText>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
