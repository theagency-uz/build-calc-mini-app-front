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

export type UnifiedCalculationValues = {
	sectionId: CalculatorMode;
	area: string;
	coveringTypeId: string;
	baseTypeId: string;
	materialId: string;
	trowelId?: string;
	dilutionId?: string;
	layerThickness?: string;
};

const isGlueIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "glue";
const isSoilIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "soil";
const isFloorIncluded = (sectionId: CalculatorMode) => sectionId === "all" || sectionId === "floor";

const findName = (options: MockOption[], id: string | undefined, t: TFunction) => {
	const option = options.find((item) => item.id === id);

	if (!option) {
		return t("common.notSelected");
	}

	return option.nameKey ? t(option.nameKey) : option.name;
};

const resultBySection: Record<
	CalculatorMode,
	Pick<CalculationResult, "amount" | "packageCount"> & {
		packageUnitKey: string;
		subtitleKey: string;
		titleKey: string;
		noteKey: string;
		unitKey: string;
	}
> = {
	all: {
		amount: 445.5,
		packageCount: 21,
		packageUnitKey: "result.packageUnits.items",
		subtitleKey: "result.mock.all.subtitle",
		titleKey: "result.mock.all.title",
		noteKey: "result.mock.all.note",
		unitKey: "result.units.mixed",
	},
	glue: {
		amount: 12,
		packageCount: 2,
		packageUnitKey: "result.packageUnits.buckets",
		subtitleKey: "result.mock.glue.subtitle",
		titleKey: "result.mock.glue.title",
		noteKey: "result.mock.glue.note",
		unitKey: "result.units.kg",
	},
	soil: {
		amount: 8.5,
		packageCount: 2,
		packageUnitKey: "result.packageUnits.canisters",
		subtitleKey: "result.mock.soil.subtitle",
		titleKey: "result.mock.soil.title",
		noteKey: "result.mock.soil.note",
		unitKey: "result.units.l",
	},
	floor: {
		amount: 425,
		packageCount: 17,
		packageUnitKey: "result.packageUnits.bags",
		subtitleKey: "result.mock.floor.subtitle",
		titleKey: "result.mock.floor.title",
		noteKey: "result.mock.floor.note",
		unitKey: "result.units.kg",
	},
};

export const getUnifiedMockResult = (values: UnifiedCalculationValues, t: TFunction): CalculationResult => {
	const sectionResult = resultBySection[values.sectionId];
	const dynamicDetails = [
		isGlueIncluded(values.sectionId) ? { label: t("result.details.trowel"), value: findName(glueTrowels, values.trowelId, t) } : null,
		isSoilIncluded(values.sectionId) ? { label: t("result.details.dilution"), value: findName(soilDilutions, values.dilutionId, t) } : null,
		isFloorIncluded(values.sectionId) ? { label: t("result.details.layerThickness"), value: `${values.layerThickness} ${t("result.units.mm")}` } : null,
	].filter((item): item is { label: string; value: string } => Boolean(item));

	return {
		kind: values.sectionId,
		amount: sectionResult.amount,
		packageCount: sectionResult.packageCount,
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
			{ label: t("result.details.material"), value: findName(materialNames, values.materialId, t) },
			...dynamicDetails,
		],
	};
};
