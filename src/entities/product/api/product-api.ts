import { apiGet } from "@/shared/api";
import type { PayloadListResponse } from "@/shared/api";

import type {
	CoveringTypeOption,
	FloorBaseOption,
	FloorProductOption,
	GlueBrandOption,
	MockOption,
	ProductDictionaries,
	SoilDilutionOption,
	SoilProductOption,
} from "../model";
import { calculationSections, createMaterialNames } from "../model/mock-options";

import type { ApiBaseType, ApiCoveringType, ApiFloorProduct, ApiGlueProduct, ApiSoilDilution, ApiSoilProduct, ApiTrowel } from "./types";

const listParams = {
	limit: 100,
	sort: "title",
	depth: 1,
};

const toOption = ({ code, title }: { code: string; title: string }): MockOption => ({
	id: code,
	name: title,
});

const toBaseTypeOption = (item: ApiBaseType): FloorBaseOption => ({
	...toOption(item),
	primerHint: item.primerHint ?? "",
});

const toCoveringTypeOption = (item: ApiCoveringType): CoveringTypeOption => ({
	...toOption(item),
	baseTypes: item.baseTypes.map(toBaseTypeOption),
});

const toTrowelOption = (item: ApiTrowel): MockOption => toOption(item);

const toSoilDilutionOption = (item: ApiSoilDilution): SoilDilutionOption => ({
	...toOption(item),
	concentrateParts: item.concentrateParts,
	waterParts: item.waterParts,
});

const getCoveringIds = (coverings: ApiCoveringType[]) => coverings.map((item) => item.code);

const toSoilProductOption = (item: ApiSoilProduct): SoilProductOption => ({
	...toOption(item),
	coveringTypeIds: getCoveringIds(item.coverings),
	consumptionReadyGramsPerM2: item.consumptionReadyGramsPerM2,
	dilutionId: typeof item.dilution === "number" ? String(item.dilution) : item.dilution.code,
});

const toFloorProductOption = (item: ApiFloorProduct): FloorProductOption => ({
	...toOption(item),
	coveringTypeIds: getCoveringIds(item.coverings),
	consumption: item.consumption,
});

const toGlueProductOption = (item: ApiGlueProduct): GlueBrandOption => ({
	...toOption(item),
	coveringTypeIds: getCoveringIds(item.coverings),
	consumptionRules:
		item.consumptionRules?.map((rule) => ({
			baseTypeIds: rule.baseTypes.map((baseType) => baseType.code),
			trowelIds: rule.trowels.map((trowel) => trowel.code),
			value: rule.value,
		})) ?? [],
});

const getList = async <T>(path: string) => {
	const response = await apiGet<PayloadListResponse<T>>(path, listParams);

	return response.docs;
};

export const getProductDictionaries = async (): Promise<ProductDictionaries> => {
	const [coveringDocs, baseTypeDocs, trowelDocs, dilutionDocs, glueDocs, soilDocs, floorDocs] = await Promise.all([
		getList<ApiCoveringType>("covering-types"),
		getList<ApiBaseType>("base-types"),
		getList<ApiTrowel>("trowels"),
		getList<ApiSoilDilution>("soil-dilutions"),
		getList<ApiGlueProduct>("glue-products"),
		getList<ApiSoilProduct>("soil-products"),
		getList<ApiFloorProduct>("floor-products"),
	]);
	const soilProducts = soilDocs.map(toSoilProductOption);
	const floorProducts = floorDocs.map(toFloorProductOption);
	const glueBrands = glueDocs.map(toGlueProductOption);
	const materialNames = createMaterialNames({ floorProducts, glueBrands, soilProducts });

	console.log(soilProducts, floorProducts, glueBrands, materialNames);

	return {
		baseTypes: baseTypeDocs.map(toBaseTypeOption),
		calculationSections,
		coveringTypes: coveringDocs.map(toCoveringTypeOption),
		floorProducts,
		glueBrands,
		glueTrowels: trowelDocs.map(toTrowelOption),
		materialNames,
		soilDilutions: dilutionDocs.map(toSoilDilutionOption),
		soilProducts,
	};
};
