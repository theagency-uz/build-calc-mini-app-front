import type { FloorProductOption } from "@/entities/product/model";

const DEFAULT_FLOOR_PACKAGE_WEIGHT_KG = 25;

type FloorCalculationParams = {
	area: number;
	layerThickness: number;
	materialId: string;
	products: FloorProductOption[];
};

type FloorCalculationResult = {
	amount: number;
	consumption: number;
	packageCount: number;
};

const roundToOne = (value: number) => Math.round(value * 10) / 10;

export const findFloorConsumption = (materialId: string, products: FloorProductOption[]) => {
	const material = products.find((item) => item.id === materialId);

	return material?.consumption ?? null;
};

export const calculateFloor = (params: FloorCalculationParams): FloorCalculationResult | null => {
	const consumption = findFloorConsumption(params.materialId, params.products);

	if (consumption === null) {
		return null;
	}

	const amount = params.area * consumption * params.layerThickness;

	return {
		amount: roundToOne(amount),
		consumption,
		packageCount: Math.ceil(amount / DEFAULT_FLOOR_PACKAGE_WEIGHT_KG),
	};
};
