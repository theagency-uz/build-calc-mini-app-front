import { useTranslation } from "react-i18next";

const languages = ["ru", "en"] as const;

export type Language = (typeof languages)[number];

export function useLanguage() {
	const { i18n } = useTranslation();
	const currentLanguage: Language = i18n.resolvedLanguage === "en" ? "en" : "ru";

	const changeLanguage = (language: Language) => {
		void i18n.changeLanguage(language);
	};

	return {
		changeLanguage,
		currentLanguage,
		languages,
	};
}
