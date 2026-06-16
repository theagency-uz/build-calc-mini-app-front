import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import ru from "./locales/ru/common.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "ru",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { common: en },
			ru: { common: ru },
		},
		defaultNS: "common",
		ns: ["common"],
		supportedLngs: ["ru", "en"],
		detection: {
			caches: ["localStorage"],
			lookupLocalStorage: "build-calc-language",
			order: ["localStorage", "navigator"],
		},
	});

export { i18n };
