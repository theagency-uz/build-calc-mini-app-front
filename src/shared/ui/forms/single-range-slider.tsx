import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/utils";

export type SingleRangeSliderProps = {
	name?: string;
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onChange?: (value: number) => void;
	onBlur?: () => void;
};

export function SingleRangeSlider({
	name,
	value = 0,
	min = 0,
	max = 100,
	step = 1,
	disabled,
	onChange,
	onBlur,
}: SingleRangeSliderProps) {
	const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;

	return (
		<div className="flex w-full items-center gap-3">
			<input
				name={name}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				disabled={disabled}
				onChange={(event) => onChange?.(Number(event.target.value))}
				onBlur={onBlur}
				style={{ "--range-progress": `${progress}%` } as CSSProperties}
				className={cn(
					"h-2 w-full cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,var(--slider-range)_0%,var(--slider-range)_var(--range-progress),var(--slider-track)_var(--range-progress),var(--slider-track)_100%)] outline-none",
					"focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					"disabled:cursor-not-allowed disabled:opacity-60",
					"[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-control [&::-moz-range-thumb]:bg-slider-range",
					"[&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-control [&::-webkit-slider-thumb]:bg-slider-range"
				)}
			/>
			<span className="min-w-12 rounded-control bg-control-muted px-2 py-1 text-center text-sm font-medium text-control-foreground">
				{value}%
			</span>
		</div>
	);
}
