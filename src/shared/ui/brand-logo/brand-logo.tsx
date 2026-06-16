import { useTranslation } from "react-i18next";

type BrandLogoProps = {
	variant?: "default" | "hero";
};

export function BrandLogo({ variant = "default" }: BrandLogoProps) {
	const { t } = useTranslation();
	const isHero = variant === "hero";

	return (
		<div className={isHero ? "flex min-w-0 items-center gap-4" : "flex min-w-0 items-center gap-3"}>
			<div
				className={
					isHero
						? "flex size-16 shrink-0 items-center justify-center rounded-[18px] bg-[#1f8df6] text-2xl font-bold tracking-tight text-white shadow-[0_0_34px_rgba(31,141,246,0.35)]"
						: "flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#1f8df6] text-xl font-bold tracking-tight text-white shadow-control"
				}
			>
				WL
			</div>
			<div className="min-w-0">
				<p className={isHero ? "truncate text-4xl font-bold leading-none text-primary" : "truncate text-2xl font-bold leading-none text-card-foreground"}>
					{t("brand.name")}
				</p>
				<p className={isHero ? "mt-2 truncate text-sm font-medium text-muted-foreground" : "mt-1 truncate text-xs font-medium text-muted-foreground"}>
					{t("brand.tagline")}
				</p>
			</div>
		</div>
	);
}
