import type { TFunction } from "i18next";

import type { CalculationResult, CalculatorMode } from "@/entities/calculator/model";
import {
	calculationSections,
	coveringTypes,
	getBaseTypesByCovering,
	materialNames,
	soilDilutions,
	glueTrowels,
} from "@/entities/product/model";
import type { MockOption } from "@/entities/product/model";

import { calculateFloor } from "./calculate-floor";
import { calculateGlue } from "./calculate-glue";
import { calculateSoil } from "./calculate-soil";

export type UnifiedCalculationValues = {
	sectionId: CalculatorMode;
	area: string;
	coveringTypeId: string;
	baseTypeId: string;
	materialId?: string;
	soilMaterialId?: string;
	floorMaterialId?: string;
	glueMaterialId?: string;
	trowelId?: string;
	dilutionId?: string;
	layerThickness?: string;
};

export type UnifiedCalculationResult =
	| {
			status: "success";
			result: CalculationResult;
	  }
	| {
			status: "error";
			field: keyof UnifiedCalculationValues;
			message: string;
	  };

const isGlueIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "glue";
const isSoilIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "soil";
const isFloorIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "floor";
const roundToOne = (value: number) => Math.round(value * 10) / 10;

const findName = (options: MockOption[], id: string | undefined, t: TFunction) => {
	const option = options.find((item) => item.id === id);

	if (!option) {
		return t("common.notSelected");
	}

	return option.nameKey ? t(option.nameKey) : option.name;
};

const resultMetaBySection: Record<
	CalculatorMode,
	{
		packageUnitKey: string;
		subtitleKey: string;
		titleKey: string;
		noteKey: string;
		unitKey: string;
	}
> = {
	all: {
		packageUnitKey: "result.packageUnits.packages",
		subtitleKey: "result.mock.all.subtitle",
		titleKey: "result.mock.all.title",
		noteKey: "result.mock.all.note",
		unitKey: "result.units.kg",
	},
	glue: {
		packageUnitKey: "result.packageUnits.buckets",
		subtitleKey: "result.mock.glue.subtitle",
		titleKey: "result.mock.glue.title",
		noteKey: "result.mock.glue.note",
		unitKey: "result.units.kg",
	},
	soil: {
		packageUnitKey: "result.packageUnits.canisters",
		subtitleKey: "result.mock.soil.subtitle",
		titleKey: "result.mock.soil.title",
		noteKey: "result.mock.soil.note",
		unitKey: "result.units.kg",
	},
	floor: {
		packageUnitKey: "result.packageUnits.bags",
		subtitleKey: "result.mock.floor.subtitle",
		titleKey: "result.mock.floor.title",
		noteKey: "result.mock.floor.note",
		unitKey: "result.units.kg",
	},
};

export const getUnifiedCalculationResult = (values: UnifiedCalculationValues, t: TFunction): UnifiedCalculationResult => {
	const sectionResult = resultMetaBySection[values.sectionId];
	const dynamicDetails = [
		isGlueIncluded(values.sectionId) ? { label: t("result.details.trowel"), value: findName(glueTrowels, values.trowelId, t) } : null,
		isSoilIncluded(values.sectionId) ? { label: t("result.details.dilution"), value: findName(soilDilutions, values.dilutionId, t) } : null,
		isFloorIncluded(values.sectionId) ? { label: t("result.details.layerThickness"), value: `${values.layerThickness} ${t("result.units.mm")}` } : null,
	].filter((item): item is { label: string; value: string } => Boolean(item));
	const materialDetails =
		values.sectionId === "all"
			? [
					{ label: t("result.details.soilMaterial"), value: findName(materialNames, values.soilMaterialId, t) },
					{ label: t("result.details.floorMaterial"), value: findName(materialNames, values.floorMaterialId, t) },
					{ label: t("result.details.glueMaterial"), value: findName(materialNames, values.glueMaterialId, t) },
				]
			: [{ label: t("result.details.material"), value: findName(materialNames, values.materialId, t) }];
	let amount = 0;
	let packageCount = 0;

	if (values.sectionId === "all") {
		const soilResult = calculateSoil({
			area: Number(values.area),
			dilutionId: values.dilutionId ?? "",
			materialId: values.soilMaterialId ?? "",
		});
		const floorResult = calculateFloor({
			area: Number(values.area),
			layerThickness: Number(values.layerThickness),
			materialId: values.floorMaterialId ?? "",
		});
		const glueResult = calculateGlue({
			area: Number(values.area),
			baseTypeId: values.baseTypeId,
			materialId: values.glueMaterialId ?? "",
			trowelId: values.trowelId ?? "",
		});

		if (!soilResult) {
			return {
				status: "error",
				field: "soilMaterialId",
				message: t("form.validation.noSoilConsumptionRule"),
			};
		}

		if (!floorResult) {
			return {
				status: "error",
				field: "floorMaterialId",
				message: t("form.validation.noFloorConsumptionRule"),
			};
		}

		if (!glueResult) {
			return {
				status: "error",
				field: "trowelId",
				message: t("form.validation.noGlueConsumptionRule"),
			};
		}

		amount = roundToOne(soilResult.amount + floorResult.amount + glueResult.amount);
		packageCount = soilResult.packageCount + floorResult.packageCount + glueResult.packageCount;
		dynamicDetails.push(
			{
				label: t("result.details.soilAmount"),
				value: `${soilResult.amount} ${t("result.units.kg")}`,
			},
			{
				label: t("result.details.floorAmount"),
				value: `${floorResult.amount} ${t("result.units.kg")}`,
			},
			{
				label: t("result.details.glueAmount"),
				value: `${glueResult.amount} ${t("result.units.kg")}`,
			},
			{
				label: t("result.details.readyMixture"),
				value: `${soilResult.readyAmount} ${t("result.units.kg")}`,
			},
			{
				label: t("result.details.soilPackages"),
				value: `${soilResult.packageCount} ${t("result.packageUnits.canisters")}`,
			},
			{
				label: t("result.details.floorPackages"),
				value: `${floorResult.packageCount} ${t("result.packageUnits.bags")}`,
			},
			{
				label: t("result.details.gluePackages"),
				value: `${glueResult.packageCount} ${t("result.packageUnits.buckets")}`,
			}
		);
	}

	if (values.sectionId === "glue") {
		const glueResult = calculateGlue({
			area: Number(values.area),
			baseTypeId: values.baseTypeId,
			materialId: values.materialId ?? "",
			trowelId: values.trowelId ?? "",
		});

		if (!glueResult) {
			return {
				status: "error",
				field: "trowelId",
				message: t("form.validation.noGlueConsumptionRule"),
			};
		}

		amount = glueResult.amount;
		packageCount = glueResult.packageCount;
		dynamicDetails.push({
			label: t("result.details.consumption"),
			value: `${glueResult.consumption} ${t("result.units.gramsPerM2")}`,
		});
	}

	if (values.sectionId === "floor") {
		const floorResult = calculateFloor({
			area: Number(values.area),
			layerThickness: Number(values.layerThickness),
			materialId: values.materialId ?? "",
		});

		if (!floorResult) {
			return {
				status: "error",
				field: "materialId",
				message: t("form.validation.noFloorConsumptionRule"),
			};
		}

		amount = floorResult.amount;
		packageCount = floorResult.packageCount;
		dynamicDetails.push({
			label: t("result.details.consumption"),
			value: `${floorResult.consumption} ${t("result.units.kgPerM2Mm")}`,
		});
	}

	if (values.sectionId === "soil") {
		const soilResult = calculateSoil({
			area: Number(values.area),
			dilutionId: values.dilutionId ?? "",
			materialId: values.materialId ?? "",
		});

		if (!soilResult) {
			return {
				status: "error",
				field: "materialId",
				message: t("form.validation.noSoilConsumptionRule"),
			};
		}

		amount = soilResult.amount;
		packageCount = soilResult.packageCount;
		dynamicDetails.push(
			{
				label: t("result.details.consumption"),
				value: `${soilResult.consumptionReadyGramsPerM2} ${t("result.units.gramsPerM2")}`,
			},
			{
				label: t("result.details.readyMixture"),
				value: `${soilResult.readyAmount} ${t("result.units.kg")}`,
			}
		);
	}

	return {
		status: "success",
		result: {
			kind: values.sectionId,
			amount,
			packageCount,
			packageUnit: t(sectionResult.packageUnitKey),
			subtitle: t(sectionResult.subtitleKey),
			title: t(sectionResult.titleKey),
			note: t(sectionResult.noteKey),
			unit: t(sectionResult.unitKey),
			details: [
				{ label: t("result.details.section"), value: findName(calculationSections, values.sectionId, t) },
				{ label: t("result.details.area"), value: `${values.area} m2` },
				{ label: t("result.details.coveringType"), value: findName(coveringTypes, values.coveringTypeId, t) },
				{ label: t("result.details.baseType"), value: findName(getBaseTypesByCovering(values.coveringTypeId), values.baseTypeId, t) },
				...materialDetails,
				...dynamicDetails,
			],
		},
	};
};
