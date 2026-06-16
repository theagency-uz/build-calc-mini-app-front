import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";

type ThemeToggleProps = {
	isDarkTheme: boolean;
	onToggle: () => void;
};

export function ThemeToggle({ isDarkTheme, onToggle }: ThemeToggleProps) {
	const { t } = useTranslation();

	return (
		<button
			type="button"
			aria-label={isDarkTheme ? t("theme.light") : t("theme.dark")}
			onClick={onToggle}
			className="relative flex h-8 w-14 shrink-0 items-center rounded-full border border-border bg-muted p-1 transition-colors"
		>
			<span
				className={cn(
					"flex size-6 items-center justify-center rounded-full bg-card text-primary shadow-control transition-transform",
					isDarkTheme && "translate-x-6"
				)}
			>
				{isDarkTheme ? <Moon className="size-4" /> : <Sun className="size-4" />}
			</span>
		</button>
	);
}
