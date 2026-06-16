import { ThemeToggle } from "@/features/switch-design-theme";
import { BrandLogo } from "@/shared/ui/brand-logo";

type MainPageHeaderProps = {
	isDarkTheme: boolean;
	onToggleTheme: () => void;
};

export function MainPageHeader({ isDarkTheme, onToggleTheme }: MainPageHeaderProps) {
	return (
		<header className="bg-[var(--app-header)] px-4 pb-8 pt-[calc(24px+env(safe-area-inset-top))]">
			<div className="relative flex items-center justify-center">
				<BrandLogo variant="hero" />
				<div className="absolute right-0 top-1">
					<ThemeToggle isDarkTheme={isDarkTheme} onToggle={onToggleTheme} />
				</div>
			</div>
		</header>
	);
}
