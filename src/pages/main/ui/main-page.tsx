import { useLanguage } from "@/features/switch-language";
import { useDesignTheme } from "@/features/switch-design-theme";

import { useMainPage } from "../model";
import { MainPageView } from "./main-page-view";

export function MainPage() {
	const { result, setResult, clearResult } = useMainPage();
	const { isDarkTheme, toggleTheme } = useDesignTheme();
	const { changeLanguage, currentLanguage, languages } = useLanguage();

	return (
		<MainPageView
			result={result}
			currentLanguage={currentLanguage}
			isDarkTheme={isDarkTheme}
			languages={languages}
			onCalculate={setResult}
			onBackToForm={clearResult}
			onChangeLanguage={changeLanguage}
			onToggleTheme={toggleTheme}
		/>
	);
}
