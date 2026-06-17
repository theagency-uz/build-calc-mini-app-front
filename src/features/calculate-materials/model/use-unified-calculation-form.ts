import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { CalculationResult, CalculatorMode } from "@/entities/calculator/model";
import { getBaseTypesByCovering, getMaterialNamesBySection, getSoilDilutionByMaterial } from "@/entities/product/model";

import { getUnifiedCalculationResult } from "../lib/mock-results";
import type { UnifiedCalculationValues } from "../lib/mock-results";

const sectionIds = ["all", "soil", "floor", "glue"] as const;

const isGlueIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "glue";
const isSoilIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "soil";
const isFloorIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "floor";
const isAllSelected = (sectionId: CalculatorMode) => sectionId === "all";

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
					materialId: z.string().optional(),
					soilMaterialId: z.string().optional(),
					floorMaterialId: z.string().optional(),
					glueMaterialId: z.string().optional(),
					trowelId: z.string().optional(),
					dilutionId: z.string().optional(),
					layerThickness: z.string().optional(),
				})
				.superRefine((values, ctx) => {
					if (isAllSelected(values.sectionId)) {
						if (!values.soilMaterialId) {
							ctx.addIssue({ code: "custom", path: ["soilMaterialId"], message: t("form.validation.materialRequired") });
						}

						if (!values.floorMaterialId) {
							ctx.addIssue({ code: "custom", path: ["floorMaterialId"], message: t("form.validation.materialRequired") });
						}

						if (!values.glueMaterialId) {
							ctx.addIssue({ code: "custom", path: ["glueMaterialId"], message: t("form.validation.materialRequired") });
						}
					}

					if (!isAllSelected(values.sectionId) && !values.materialId) {
						ctx.addIssue({ code: "custom", path: ["materialId"], message: t("form.validation.materialRequired") });
					}

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
	const { clearErrors, control, handleSubmit, setError, setValue, formState } = useForm<UnifiedCalculationValues>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			sectionId: "all",
			area: "",
			coveringTypeId: "",
			baseTypeId: "",
			materialId: "",
			soilMaterialId: "",
			floorMaterialId: "",
			glueMaterialId: "",
			trowelId: "",
			dilutionId: "",
			layerThickness: "",
		},
	});
	const sectionId = useWatch({ control, name: "sectionId" });
	const coveringTypeId = useWatch({ control, name: "coveringTypeId" });
	const baseTypeId = useWatch({ control, name: "baseTypeId" });
	const materialId = useWatch({ control, name: "materialId" });
	const soilMaterialId = useWatch({ control, name: "soilMaterialId" });
	const floorMaterialId = useWatch({ control, name: "floorMaterialId" });
	const glueMaterialId = useWatch({ control, name: "glueMaterialId" });
	const trowelId = useWatch({ control, name: "trowelId" });
	const area = useWatch({ control, name: "area" });
	const isAllSection = isAllSelected(sectionId);
	const showDilution = isSoilIncluded(sectionId);
	const showLayerThickness = isFloorIncluded(sectionId);
	const showTrowel = isGlueIncluded(sectionId);

	const baseTypeOptions = useMemo(() => getBaseTypesByCovering(coveringTypeId), [coveringTypeId]);
	const materialOptions = useMemo(() => getMaterialNamesBySection(sectionId, coveringTypeId), [sectionId, coveringTypeId]);
	const soilMaterialOptions = useMemo(() => getMaterialNamesBySection("soil", coveringTypeId), [coveringTypeId]);
	const floorMaterialOptions = useMemo(() => getMaterialNamesBySection("floor", coveringTypeId), [coveringTypeId]);
	const glueMaterialOptions = useMemo(() => getMaterialNamesBySection("glue", coveringTypeId), [coveringTypeId]);
	const soilDilution = useMemo(
		() => getSoilDilutionByMaterial(isAllSection ? soilMaterialId : materialId),
		[isAllSection, materialId, soilMaterialId]
	);

	useEffect(() => {
		if (baseTypeId && !baseTypeOptions.some((item) => item.id === baseTypeId)) {
			setValue("baseTypeId", "", { shouldValidate: true });
		}
	}, [baseTypeId, baseTypeOptions, setValue]);

	useEffect(() => {
		if (materialId && !materialOptions.some((item) => item.id === materialId)) {
			setValue("materialId", "", { shouldValidate: true });
		}
	}, [isAllSection, materialId, materialOptions, setValue]);

	useEffect(() => {
		if (soilMaterialId && !soilMaterialOptions.some((item) => item.id === soilMaterialId)) {
			setValue("soilMaterialId", "", { shouldValidate: true });
		}
	}, [setValue, soilMaterialId, soilMaterialOptions]);

	useEffect(() => {
		if (floorMaterialId && !floorMaterialOptions.some((item) => item.id === floorMaterialId)) {
			setValue("floorMaterialId", "", { shouldValidate: true });
		}
	}, [floorMaterialId, floorMaterialOptions, setValue]);

	useEffect(() => {
		if (glueMaterialId && !glueMaterialOptions.some((item) => item.id === glueMaterialId)) {
			setValue("glueMaterialId", "", { shouldValidate: true });
		}
	}, [glueMaterialId, glueMaterialOptions, setValue]);

	useEffect(() => {
		clearErrors("trowelId");
	}, [baseTypeId, clearErrors, glueMaterialId, materialId, trowelId]);

	useEffect(() => {
		setValue("dilutionId", showDilution ? soilDilution?.id ?? "" : "", { shouldValidate: true });
	}, [setValue, showDilution, soilDilution]);

	const onSubmit = handleSubmit((values) => {
		const calculation = getUnifiedCalculationResult(values, t);

		if (calculation.status === "error") {
			setError(calculation.field, { type: "manual", message: calculation.message });
			return;
		}

		onCalculate(calculation.result);
	});

	return {
		area,
		baseTypeOptions,
		control,
		floorMaterialOptions,
		glueMaterialOptions,
		isBaseTypeDisabled: !coveringTypeId,
		isAllSection,
		isMaterialDisabled: !coveringTypeId,
		isValid: formState.isValid,
		materialOptions,
		onSubmit,
		showDilution,
		showLayerThickness,
		showTrowel,
		soilMaterialOptions,
		soilDilution,
	};
}
