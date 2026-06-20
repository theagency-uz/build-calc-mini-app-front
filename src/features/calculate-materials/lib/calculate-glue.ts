import type { GlueBrandOption } from "@/entities/product/model";

const GRAMS_IN_KILOGRAM = 1000;
const DEFAULT_GLUE_PACKAGE_WEIGHT_KG = 13;

type GlueCalculationParams = {
	area: number;
	baseTypeId: string;
	materialId: string;
	products: GlueBrandOption[];
	trowelId: string;
};

type GlueCalculationResult = {
	amount: number;
	consumption: number;
	packageCount: number;
};

const roundToOne = (value: number) => Math.round(value * 10) / 10;

export const findGlueConsumption = ({ baseTypeId, materialId, products, trowelId }: Omit<GlueCalculationParams, "area">) => {
	const material = products.find((item) => item.id === materialId);
	const rule = material?.consumptionRules.find((item) => item.baseTypeIds.includes(baseTypeId) && item.trowelIds.includes(trowelId));

	return rule?.value ?? null;
};

export const calculateGlue = (params: GlueCalculationParams): GlueCalculationResult | null => {
	const consumption = findGlueConsumption(params);

	console.log("params ", params);

	if (consumption === null) {
		return null;
	}

	const amount = (params.area * consumption) / GRAMS_IN_KILOGRAM;

	return {
		amount: roundToOne(amount),
		consumption,
		packageCount: Math.ceil(amount / DEFAULT_GLUE_PACKAGE_WEIGHT_KG),
	};
};
