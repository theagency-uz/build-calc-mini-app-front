import { lazy, Suspense } from "react";

import type { CalculationResult } from "@/entities/calculator/model";
import { UnifiedCalculationForm } from "@/features/calculate-materials/ui";

import { MainPageHeader } from "./main-page-header";

const ResultScreen = lazy(() => import("@/widgets/result-summary").then((module) => ({ default: module.ResultScreen })));

type MainPageViewProps = {
	result: CalculationResult | null;
	isDarkTheme: boolean;
	onCalculate: (result: CalculationResult) => void;
	onBackToForm: () => void;
	onToggleTheme: () => void;
};

export function MainPageView({ result, isDarkTheme, onCalculate, onBackToForm, onToggleTheme }: MainPageViewProps) {
	return (
		<main className="min-h-svh bg-(--app-background) text-foreground">
			<div className="mx-auto flex min-h-svh w-full max-w-md flex-col overflow-hidden bg-(--app-background)">
				<MainPageHeader isDarkTheme={isDarkTheme} onToggleTheme={onToggleTheme} />
				<section className="flex-1 overflow-y-auto bg-(--app-content) px-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
					{result ? (
						<Suspense fallback={<div className="text-sm text-muted-foreground">Готовим результат...</div>}>
							<ResultScreen result={result} onBack={onBackToForm} />
						</Suspense>
					) : null}
					{!result ? <UnifiedCalculationForm onCalculate={onCalculate} /> : null}
				</section>
			</div>
		</main>
	);
}
