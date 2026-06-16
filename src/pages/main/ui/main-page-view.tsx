import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import type { CalculationResult } from "@/entities/calculator/model";
import { UnifiedCalculationForm } from "@/features/calculate-materials/ui";
import type { Language } from "@/features/switch-language";

import { MainPageHeader } from "./main-page-header";

const ResultScreen = lazy(() => import("@/widgets/result-summary").then((module) => ({ default: module.ResultScreen })));

type MainPageViewProps = {
	result: CalculationResult | null;
	currentLanguage: Language;
	isDarkTheme: boolean;
	languages: readonly Language[];
	onCalculate: (result: CalculationResult) => void;
	onBackToForm: () => void;
	onChangeLanguage: (language: Language) => void;
	onToggleTheme: () => void;
};

export function MainPageView({
	result,
	currentLanguage,
	isDarkTheme,
	languages,
	onCalculate,
	onBackToForm,
	onChangeLanguage,
	onToggleTheme,
}: MainPageViewProps) {
	const { t } = useTranslation();

	return (
		<main className="min-h-svh bg-(--app-background) text-foreground">
			<div className="mx-auto flex min-h-svh w-full max-w-md flex-col overflow-hidden bg-(--app-background)">
				<MainPageHeader
					currentLanguage={currentLanguage}
					isDarkTheme={isDarkTheme}
					languages={languages}
					onChangeLanguage={onChangeLanguage}
					onToggleTheme={onToggleTheme}
				/>
				<section className="flex-1 overflow-y-auto bg-(--app-content) px-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
					{result ? (
						<Suspense fallback={<div className="text-sm text-muted-foreground">{t("common.loadingResult")}</div>}>
							<ResultScreen result={result} onBack={onBackToForm} />
						</Suspense>
					) : null}
					{!result ? <UnifiedCalculationForm onCalculate={onCalculate} /> : null}
				</section>
			</div>
		</main>
	);
}
