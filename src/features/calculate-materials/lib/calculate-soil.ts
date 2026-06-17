import { soilProducts } from "@/entities/product/model";

const GRAMS_IN_KILOGRAM = 1000;
const DEFAULT_SOIL_PACKAGE_WEIGHT_KG = 10;

type SoilCalculationParams = {
	area: number;
	dilutionId: string;
	materialId: string;
};

type SoilCalculationResult = {
	amount: number;
	consumptionReadyGramsPerM2: number;
	packageCount: number;
	readyAmount: number;
};

const roundToOne = (value: number) => Math.round(value * 10) / 10;

const getDilutionTotalParts = (dilutionId: string) => {
	const waterParts = Number(dilutionId.replace("1-", ""));

	if (!Number.isFinite(waterParts) || waterParts <= 0) {
		return null;
	}

	return 1 + waterParts;
};

export const findSoilConsumption = (materialId: string) => {
	const material = soilProducts.find((item) => item.id === materialId);

	return material?.consumptionReadyGramsPerM2 ?? null;
};

export const calculateSoil = (params: SoilCalculationParams): SoilCalculationResult | null => {
	const consumptionReadyGramsPerM2 = findSoilConsumption(params.materialId);
	const dilutionTotalParts = getDilutionTotalParts(params.dilutionId);

	if (consumptionReadyGramsPerM2 === null || dilutionTotalParts === null) {
		return null;
	}

	const readyAmount = (params.area * consumptionReadyGramsPerM2) / GRAMS_IN_KILOGRAM;
	const amount = readyAmount / dilutionTotalParts;

	return {
		amount: roundToOne(amount),
		consumptionReadyGramsPerM2,
		packageCount: Math.ceil(amount / DEFAULT_SOIL_PACKAGE_WEIGHT_KG),
		readyAmount: roundToOne(readyAmount),
	};
};
