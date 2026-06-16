import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { CalculationResult, CalculatorMode } from "@/entities/calculator/model";
import { getBaseTypesByCovering, getMaterialNamesBySection } from "@/entities/product/model";

import { getUnifiedMockResult } from "../lib/mock-results";
import type { UnifiedCalculationValues } from "../lib/mock-results";

const sectionIds = ["all", "soil", "floor", "glue"] as const;

const isGlueIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "glue";
const isSoilIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "soil";
const isFloorIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "floor";

export function useUnifiedCalculationForm(onCalculate: (result: CalculationResult) => void) {
	const { t } = useTranslation();
	const schema = useMemo(
		() =>
			z
				.object({
					sectionId: z.enum(sectionIds),
					area: z
						.string()
						.min(1, t("form.validation.areaRequired"))
						.refine((value) => Number(value) > 0, t("form.validation.areaPositive")),
					coveringTypeId: z.string().min(1, t("form.validation.coveringTypeRequired")),
					baseTypeId: z.string().min(1, t("form.validation.baseTypeRequired")),
					materialId: z.string().min(1, t("form.validation.materialRequired")),
					trowelId: z.string().optional(),
					dilutionId: z.string().optional(),
					layerThickness: z.string().optional(),
				})
				.superRefine((values, ctx) => {
					if (isGlueIncluded(values.sectionId) && !values.trowelId) {
						ctx.addIssue({ code: "custom", path: ["trowelId"], message: t("form.validation.trowelRequired") });
					}

					if (isSoilIncluded(values.sectionId) && !values.dilutionId) {
						ctx.addIssue({ code: "custom", path: ["dilutionId"], message: t("form.validation.dilutionRequired") });
					}

					if (isFloorIncluded(values.sectionId) && (!values.layerThickness || Number(values.layerThickness) <= 0)) {
						ctx.addIssue({ code: "custom", path: ["layerThickness"], message: t("form.validation.layerThicknessRequired") });
					}
				}),
		[t]
	);
	const { control, handleSubmit, setValue, formState } = useForm<UnifiedCalculationValues>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			sectionId: "all",
			area: "",
			coveringTypeId: "",
			baseTypeId: "",
			materialId: "",
			trowelId: "",
			dilutionId: "",
			layerThickness: "",
		},
	});
	const sectionId = useWatch({ control, name: "sectionId" });
	const coveringTypeId = useWatch({ control, name: "coveringTypeId" });
	const baseTypeId = useWatch({ control, name: "baseTypeId" });
	const materialId = useWatch({ control, name: "materialId" });
	const area = useWatch({ control, name: "area" });

	const baseTypeOptions = useMemo(() => getBaseTypesByCovering(coveringTypeId), [coveringTypeId]);
	const materialOptions = useMemo(() => getMaterialNamesBySection(sectionId), [sectionId]);

	useEffect(() => {
		if (baseTypeId && !baseTypeOptions.some((item) => item.id === baseTypeId)) {
			setValue("baseTypeId", "", { shouldValidate: true });
		}
	}, [baseTypeId, baseTypeOptions, setValue]);

	useEffect(() => {
		if (materialId && !materialOptions.some((item) => item.id === materialId)) {
			setValue("materialId", "", { shouldValidate: true });
		}
	}, [materialId, materialOptions, setValue]);

	return {
		area,
		baseTypeOptions,
		control,
		isBaseTypeDisabled: !coveringTypeId,
		isValid: formState.isValid,
		materialOptions,
		onSubmit: handleSubmit((values) => onCalculate(getUnifiedMockResult(values, t))),
		showDilution: isSoilIncluded(sectionId),
		showLayerThickness: isFloorIncluded(sectionId),
		showTrowel: isGlueIncluded(sectionId),
	};
}
