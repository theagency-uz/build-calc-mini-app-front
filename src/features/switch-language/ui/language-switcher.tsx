import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";

import type { Language } from "../model";

type LanguageSwitcherProps = {
	currentLanguage: Language;
	languages: readonly Language[];
	onChange: (language: Language) => void;
};

export function LanguageSwitcher({ currentLanguage, languages, onChange }: LanguageSwitcherProps) {
	const { t } = useTranslation();

	return (
		<div className="flex rounded-full border border-border bg-muted p-1" aria-label={t("language.label")}>
			{languages.map((language) => (
				<button
					key={language}
					type="button"
					onClick={() => onChange(language)}
					className={cn(
						"h-7 min-w-9 rounded-full px-2 text-xs font-bold text-muted-foreground transition-colors",
						currentLanguage === language && "bg-primary text-primary-foreground shadow-control"
					)}
				>
					{t(`language.${language}`)}
				</button>
			))}
		</div>
	);
}
