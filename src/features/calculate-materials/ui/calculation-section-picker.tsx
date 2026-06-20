import { Beaker, Brush, Grid2X2, Layers } from "lucide-react";
import { useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";

import { cn } from "@/shared/lib/utils";
import type { SelectOption } from "@/shared/ui/forms";

type CalculationSectionPickerProps = {
	value: string;
	options: SelectOption[];
	error?: boolean;
	onChange: (value: string) => void;
	onBlur: () => void;
};

const icons = {
	all: Grid2X2,
	soil: Beaker,
	floor: Layers,
	glue: Brush,
};

export function CalculationSectionPicker({ value, options, error, onChange, onBlur }: CalculationSectionPickerProps) {
	const drag = useRef({
		isPointerDown: false,
		startX: 0,
		startScrollLeft: 0,
		hasMoved: false,
	});
	const [isDragging, setIsDragging] = useState(false);

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (event.pointerType !== "mouse" || event.button !== 0) {
			return;
		}

		drag.current = {
			isPointerDown: true,
			startX: event.clientX,
			startScrollLeft: event.currentTarget.scrollLeft,
			hasMoved: false,
		};
	};

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!drag.current.isPointerDown) {
			return;
		}

		const distance = event.clientX - drag.current.startX;

		if (Math.abs(distance) < 4) {
			return;
		}

		if (!drag.current.hasMoved) {
			drag.current.hasMoved = true;
			event.currentTarget.setPointerCapture(event.pointerId);
		}

		setIsDragging(true);
		event.preventDefault();
		event.currentTarget.scrollLeft = drag.current.startScrollLeft - distance;
	};

	const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
		if (!drag.current.isPointerDown) {
			return;
		}

		drag.current.isPointerDown = false;
		setIsDragging(false);

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		window.setTimeout(() => {
			drag.current.hasMoved = false;
		}, 0);
	};

	const handlePointerCancel = () => {
		drag.current.isPointerDown = false;
		drag.current.hasMoved = false;
		setIsDragging(false);
	};

	const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
		if (!drag.current.hasMoved) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		drag.current.hasMoved = false;
	};

	return (
		<div
			role="group"
			aria-invalid={error}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerCancel}
			onClickCapture={handleClickCapture}
			className={cn(
				"-mx-1 grid snap-x snap-mandatory auto-cols-[108px] grid-flow-col gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
				"cursor-grab select-none",
				isDragging && "cursor-grabbing"
			)}
		>
			{options.map((option) => {
				const Icon = icons[option.id as keyof typeof icons] ?? Grid2X2;
				const isActive = option.id === value;

				return (
					<button
						key={option.id}
						type="button"
						aria-pressed={isActive}
						aria-invalid={error}
						onClick={() => onChange(option.id)}
						onBlur={onBlur}
						className={cn(
							"flex h-20 snap-start flex-col items-center justify-center gap-2 rounded-lg border border-control-border bg-control px-3 text-sm font-semibold text-muted-foreground shadow-control transition-colors",
							"focus-visible:border-control-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
							"aria-[pressed=true]:border-primary aria-[pressed=true]:bg-primary aria-[pressed=true]:text-primary-foreground",
							"aria-[invalid=true]:border-destructive"
						)}
					>
						<Icon className="size-5" />
						<span className="w-full truncate text-center">{option.name}</span>
					</button>
				);
			})}
		</div>
	);
}
