import type { SoilDilutionOption, SoilProductOption } from "@/entities/product/model";

const GRAMS_IN_KILOGRAM = 1000;
const DEFAULT_SOIL_PACKAGE_WEIGHT_KG = 10;

type SoilCalculationParams = {
	area: number;
	dilutions: SoilDilutionOption[];
	dilutionId: string;
	materialId: string;
	products: SoilProductOption[];
};

type SoilCalculationResult = {
	amount: number;
	consumptionReadyGramsPerM2: number;
	packageCount: number;
	readyAmount: number;
};

const roundToOne = (value: number) => Math.round(value * 10) / 10;

const getDilutionParts = (dilutionId: string, dilutions: SoilDilutionOption[]) => {
	const dilution = dilutions.find((item) => item.id === dilutionId);

	if (dilution) {
		return {
			concentrateParts: dilution.concentrateParts,
			totalParts: dilution.concentrateParts + dilution.waterParts,
		};
	}

	const waterParts = Number(dilutionId.replace("1-", ""));

	if (!Number.isFinite(waterParts) || waterParts <= 0) {
		return null;
	}

	return {
		concentrateParts: 1,
		totalParts: 1 + waterParts,
	};
};

export const findSoilConsumption = (materialId: string, products: SoilProductOption[]) => {
	const material = products.find((item) => item.id === materialId);

	return material?.consumptionReadyGramsPerM2 ?? null;
};

export const calculateSoil = (params: SoilCalculationParams): SoilCalculationResult | null => {
	const consumptionReadyGramsPerM2 = findSoilConsumption(params.materialId, params.products);
	const dilutionParts = getDilutionParts(params.dilutionId, params.dilutions);

	if (consumptionReadyGramsPerM2 === null || dilutionParts === null) {
		return null;
	}

	const readyAmount = (params.area * consumptionReadyGramsPerM2) / GRAMS_IN_KILOGRAM;
	const amount = (readyAmount / dilutionParts.totalParts) * dilutionParts.concentrateParts;

	return {
		amount: roundToOne(amount),
		consumptionReadyGramsPerM2,
		packageCount: Math.ceil(amount / DEFAULT_SOIL_PACKAGE_WEIGHT_KG),
		readyAmount: roundToOne(readyAmount),
	};
};
