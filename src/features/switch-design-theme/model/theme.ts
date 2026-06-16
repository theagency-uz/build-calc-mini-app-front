export type Theme = "telegram" | "corporate" | "construction" | "premium" | "graphite" | "dark-premium";

export const lightTheme: Theme = "telegram";
export const darkTheme: Theme = "graphite";
export const themes: Theme[] = ["telegram", "corporate", "construction", "premium", "graphite", "dark-premium"];
export const themeStorageKey = "build-calc-theme";

export const isTheme = (value: string | null): value is Theme => Boolean(value && themes.includes(value as Theme));

export const getInitialTheme = () => {
	if (typeof window === "undefined") {
		return lightTheme;
	}

	const urlTheme = new URLSearchParams(window.location.search).get("theme");
	const savedTheme = localStorage.getItem(themeStorageKey);

	if (isTheme(urlTheme)) {
		return urlTheme;
	}

	if (isTheme(savedTheme)) {
		return savedTheme;
	}

	return darkTheme;
};
