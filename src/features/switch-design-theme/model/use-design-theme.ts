import { useEffect, useState } from "react";

import { darkTheme, getInitialTheme, isTheme, lightTheme, themes, themeStorageKey } from "./theme";
import type { Theme } from "./theme";

declare global {
	interface Window {
		setBuildCalcTheme?: (theme: Theme) => void;
		buildCalcThemes?: Theme[];
	}
}

export function useDesignTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);
	const isDarkTheme = theme === darkTheme;

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem(themeStorageKey, theme);
	}, [theme]);

	useEffect(() => {
		window.buildCalcThemes = themes;
		window.setBuildCalcTheme = (nextTheme) => {
			if (isTheme(nextTheme)) {
				setTheme(nextTheme);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (!event.altKey || !event.shiftKey || event.code !== "KeyT") {
				return;
			}

			setTheme((currentTheme) => {
				const currentIndex = themes.indexOf(currentTheme);

				return themes[(currentIndex + 1) % themes.length];
			});
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			delete window.buildCalcThemes;
			delete window.setBuildCalcTheme;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return {
		isDarkTheme,
		toggleTheme: () => setTheme(isDarkTheme ? lightTheme : darkTheme),
	};
}
