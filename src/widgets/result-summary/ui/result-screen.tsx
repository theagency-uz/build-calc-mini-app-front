import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, PackageCheck, Send, Sparkles } from "lucide-react";

import type { CalculationResult } from "@/entities/calculator/model";
import { sendDataToTelegramBot } from "@/shared/lib/telegram";
import { Button } from "@/shared/ui/button";

type ResultScreenProps = {
	result: CalculationResult;
	onBack: () => void;
};

const useCountUp = (value: number, duration = 900) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let frame = 0;
		const startedAt = performance.now();

		const tick = (now: number) => {
			const progress = Math.min((now - startedAt) / duration, 1);
			setCount(value * progress);

			if (progress < 1) {
				frame = requestAnimationFrame(tick);
			}
		};

		frame = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(frame);
	}, [duration, value]);

	return count;
};

export function ResultScreen({ result, onBack }: ResultScreenProps) {
	const [sendStatus, setSendStatus] = useState<"idle" | "sent" | "unavailable">("idle");
	const amount = useCountUp(result.amount);
	const packages = useCountUp(result.packageCount, 700);
	const amountText = Number.isInteger(result.amount) ? Math.round(amount) : amount.toFixed(1);

	const handleSendToBot = () => {
		const isSent = sendDataToTelegramBot({
			type: "calculation_result",
			result,
		});

		setSendStatus(isSent ? "sent" : "unavailable");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 18 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.28 }}
			className="space-y-4"
		>
			<button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
				<ArrowLeft className="size-4" />
				Назад к расчету
			</button>

			<section className="overflow-hidden rounded-lg border border-border bg-card shadow-popover">
				<div className="relative p-5">
					<div className="absolute right-4 top-4 rounded-full bg-primary/10 p-3 text-primary">
						<Sparkles className="size-5" />
					</div>

					<div className="mb-5 flex size-12 items-center justify-center rounded-control bg-primary text-primary-foreground">
						<CheckCircle2 className="size-6" />
					</div>

					<p className="text-sm font-medium text-muted-foreground">Расчет готов</p>
					<h2 className="mt-1 text-2xl font-semibold leading-tight text-card-foreground">{result.title}</h2>
					<p className="mt-2 text-sm leading-5 text-muted-foreground">{result.subtitle}</p>

					<div className="mt-6 rounded-lg border border-border bg-background/70 p-4">
						<p className="text-sm text-muted-foreground">Необходимо материала</p>
						<div className="mt-2 flex items-end gap-2">
							<span className="text-5xl font-bold leading-none text-card-foreground">{amountText}</span>
							<span className="pb-1 text-xl font-semibold text-muted-foreground">{result.unit}</span>
						</div>
					</div>
				</div>
			</section>

			<motion.section
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.12, duration: 0.25 }}
				className="rounded-lg border border-border bg-card p-4 shadow-control"
			>
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-control bg-control-muted text-primary">
						<PackageCheck className="size-5" />
					</div>
					<div>
						<p className="text-sm text-muted-foreground">Рекомендуем купить</p>
						<p className="text-xl font-semibold text-card-foreground">
							{Math.round(packages)} {result.packageUnit}
						</p>
					</div>
				</div>
			</motion.section>

			<section className="rounded-lg border border-border bg-card p-4">
				<div className="space-y-3">
					{result.details.map((item) => (
						<div key={item.label} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
							<span className="text-sm text-muted-foreground">{item.label}</span>
							<span className="text-sm font-semibold text-card-foreground">{item.value}</span>
						</div>
					))}
				</div>
			</section>

			<p className="rounded-lg bg-muted p-3 text-sm leading-5 text-muted-foreground">{result.note}</p>

			<div className="space-y-3">
				<Button type="button" icon={Send} onClick={handleSendToBot}>
					Отправить в бот
				</Button>

				{sendStatus === "sent" ? (
					<p className="text-center text-sm font-medium text-primary">Результат отправлен в Telegram бот</p>
				) : null}

				{sendStatus === "unavailable" ? (
					<p className="text-center text-sm leading-5 text-muted-foreground">
						Отправка доступна, когда приложение открыто внутри Telegram.
					</p>
				) : null}
			</div>

			<Button type="button" icon={ArrowLeft} variant="secondary" onClick={onBack}>
				Изменить параметры
			</Button>
		</motion.div>
	);
}
