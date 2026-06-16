import { useDesignTheme } from "@/features/switch-design-theme";

import { useMainPage } from "../model";
import { MainPageView } from "./main-page-view";

export function MainPage() {
	const { result, setResult, clearResult } = useMainPage();
	const { isDarkTheme, toggleTheme } = useDesignTheme();

	return (
		<MainPageView
			result={result}
			isDarkTheme={isDarkTheme}
			onCalculate={setResult}
			onBackToForm={clearResult}
			onToggleTheme={toggleTheme}
		/>
	);
}
