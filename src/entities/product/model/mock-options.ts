export type MockOption = {
	id: string;
	name: string;
	nameKey?: string;
};

export type FloorBaseOption = MockOption & {
	primerHint: string;
	primerHintKey?: string;
};

export type CoveringTypeOption = MockOption & {
	baseTypes: FloorBaseOption[];
};

type ProductCoverings = {
	coveringTypeIds?: string[];
};

export type FloorProductOption = MockOption & {
	consumption: number;
} & ProductCoverings;

export type SoilProductOption = MockOption & {
	consumptionReadyGramsPerM2: number;
	dilutionId: string;
} & ProductCoverings;

export type SoilDilutionOption = MockOption & {
	concentrateParts: number;
	waterParts: number;
};

export type GlueConsumptionRule = {
	baseTypeIds: string[];
	trowelIds: string[];
	value: number;
};

export type GlueBrandOption = MockOption & {
	consumptionRules: GlueConsumptionRule[];
} & ProductCoverings;

export type MaterialOption = MockOption & {
	sectionId: "soil" | "floor" | "glue";
	coveringTypeIds: string[];
};

export type ProductDictionaries = {
	baseTypes: FloorBaseOption[];
	calculationSections: MockOption[];
	coveringTypes: CoveringTypeOption[];
	floorProducts: FloorProductOption[];
	glueBrands: GlueBrandOption[];
	glueTrowels: MockOption[];
	materialNames: MaterialOption[];
	soilDilutions: SoilDilutionOption[];
	soilProducts: SoilProductOption[];
};

export const calculationSections: MockOption[] = [
	{ id: "all", name: "All", nameKey: "options.sections.all" },
	{ id: "soil", name: "Primer", nameKey: "options.sections.soil" },
	{ id: "floor", name: "Floor", nameKey: "options.sections.floor" },
	{ id: "glue", name: "Adhesive", nameKey: "options.sections.glue" },
];

const getMaterialCoverings = (item: MockOption & ProductCoverings) => item.coveringTypeIds ?? [];

export const createMaterialNames = ({
	floorProducts: floorItems,
	glueBrands: glueItems,
	soilProducts: soilItems,
}: Pick<ProductDictionaries, "floorProducts" | "glueBrands" | "soilProducts">): MaterialOption[] => [
	...soilItems.map((item) => ({ ...item, sectionId: "soil" as const, coveringTypeIds: getMaterialCoverings(item) })),
	...floorItems.map((item) => ({ ...item, sectionId: "floor" as const, coveringTypeIds: getMaterialCoverings(item) })),
	...glueItems.map((item) => ({ ...item, sectionId: "glue" as const, coveringTypeIds: getMaterialCoverings(item) })),
];

export const emptyProductDictionaries: ProductDictionaries = {
	baseTypes: [],
	calculationSections,
	coveringTypes: [],
	floorProducts: [],
	glueBrands: [],
	glueTrowels: [],
	materialNames: [],
	soilDilutions: [],
	soilProducts: [],
};

export const getBaseTypesByCovering = (coveringTypeId?: string, coverings: CoveringTypeOption[] = []) => {
	if (!coveringTypeId) {
		return [];
	}

	return coverings.find((item) => item.id === coveringTypeId)?.baseTypes ?? [];
};

export const getMaterialNamesBySection = (sectionId?: string, coveringTypeId?: string, materials: MaterialOption[] = []) => {
	const sectionMaterials = !sectionId || sectionId === "all" ? materials : materials.filter((item) => item.sectionId === sectionId);

	if (!coveringTypeId) {
		return [];
	}

	return sectionMaterials.filter((item) => item.coveringTypeIds.includes(coveringTypeId));
};

export const getSoilDilutionByMaterial = (
	materialId?: string,
	soilItems: SoilProductOption[] = [],
	dilutions: SoilDilutionOption[] = []
) => {
	const soilProduct = soilItems.find((item) => item.id === materialId);

	if (!soilProduct) {
		return null;
	}

	return dilutions.find((item) => item.id === soilProduct.dilutionId) ?? null;
};
