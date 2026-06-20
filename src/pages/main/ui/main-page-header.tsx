import type { Language } from "@/features/switch-language";
import { LanguageSwitcher } from "@/features/switch-language";
import { ThemeToggle } from "@/features/switch-design-theme";
import { BrandLogo } from "@/shared/ui/brand-logo";

type MainPageHeaderProps = {
	currentLanguage: Language;
	isDarkTheme: boolean;
	languages: readonly Language[];
	onChangeLanguage: (language: Language) => void;
	onToggleTheme: () => void;
};

export function MainPageHeader({ currentLanguage, isDarkTheme, languages, onChangeLanguage, onToggleTheme }: MainPageHeaderProps) {
	return (
		<header className="bg-(--app-header) px-4 pb-8 pt-[calc(16px+env(safe-area-inset-top))]">
			<div className="mb-7 flex items-center justify-between gap-3">
				<LanguageSwitcher currentLanguage={currentLanguage} languages={languages} onChange={onChangeLanguage} />
				<ThemeToggle isDarkTheme={isDarkTheme} onToggle={onToggleTheme} />
			</div>
			<div className="flex items-center justify-center">
				<BrandLogo variant="hero" />
			</div>
		</header>
	);
}
