export type MockOption = {
	id: string;
	name: string;
	nameKey?: string;
};

export type FloorBaseOption = MockOption & {
	primerHint: string;
	primerHintKey?: string;
};

export type FloorProductOption = MockOption & {
	consumption: number;
};

export type SoilProductOption = MockOption & {
	consumptionReadyGramsPerM2: number;
	dilutionId: string;
};

export type GlueConsumptionRule = {
	baseTypeIds: string[];
	trowelIds: string[];
	value: number;
};

export type GlueBrandOption = MockOption & {
	consumptionRules: GlueConsumptionRule[];
};

export type MaterialOption = MockOption & {
	sectionId: "soil" | "floor" | "glue";
	coveringTypeIds: string[];
};

export const calculationSections: MockOption[] = [
	{ id: "all", name: "All", nameKey: "options.sections.all" },
	{ id: "soil", name: "Primer", nameKey: "options.sections.soil" },
	{ id: "floor", name: "Floor", nameKey: "options.sections.floor" },
	{ id: "glue", name: "Adhesive", nameKey: "options.sections.glue" },
];

export const soilProducts: SoilProductOption[] = [
	{
		id: "primer-044",
		name: "044 Europrimer Multi",
		nameKey: "options.soilProducts.primer-044",
		consumptionReadyGramsPerM2: 100,
		dilutionId: "1-1",
	},
	{
		id: "primer-045",
		name: "045 Eurobond",
		nameKey: "options.soilProducts.primer-045",
		consumptionReadyGramsPerM2: 120,
		dilutionId: "1-2",
	},
	{
		id: "primer-deep",
		name: "Deep penetration primer",
		nameKey: "options.soilProducts.primer-deep",
		consumptionReadyGramsPerM2: 150,
		dilutionId: "1-5",
	},
];

export const soilDilutions: MockOption[] = [
	{ id: "1-1", name: "1:1", nameKey: "options.soilDilutions.1-1" },
	{ id: "1-2", name: "1:2", nameKey: "options.soilDilutions.1-2" },
	{ id: "1-3", name: "1:3", nameKey: "options.soilDilutions.1-3" },
	{ id: "1-4", name: "1:4", nameKey: "options.soilDilutions.1-4" },
	{ id: "1-5", name: "1:5", nameKey: "options.soilDilutions.1-5" },
];

export const soilBaseTypes: MockOption[] = [
	{ id: "absorbing", name: "Absorbent", nameKey: "options.soilBaseTypes.absorbing" },
	{ id: "non-absorbing", name: "Non-absorbent", nameKey: "options.soilBaseTypes.non-absorbing" },
];

export const floorProducts: FloorProductOption[] = [
	{ id: "level-300", name: "Self-leveling floor Level 300", nameKey: "options.floorProducts.level-300", consumption: 1.5 },
	{ id: "level-500", name: "Leveling compound Level 500", nameKey: "options.floorProducts.level-500", consumption: 1.6 },
	{ id: "screed-pro", name: "Screed Pro", nameKey: "options.floorProducts.screed-pro", consumption: 1.8 },
];

export const coveringTypes: MockOption[] = [
	{ id: "linoleum", name: "Linoleum", nameKey: "options.coveringTypes.linoleum" },
	{ id: "carpet", name: "Carpet", nameKey: "options.coveringTypes.carpet" },
	{ id: "vinyl", name: "PVC tile", nameKey: "options.coveringTypes.vinyl" },
];

export const baseTypesByCovering: Record<string, MockOption[]> = {
	linoleum: [
		{ id: "cement-screed", name: "Cement screed", nameKey: "options.baseTypes.cement-screed" },
		{ id: "concrete", name: "Concrete subfloor", nameKey: "options.baseTypes.concrete" },
	],
	carpet: [
		{ id: "cement-screed", name: "Cement screed", nameKey: "options.baseTypes.cement-screed" },
		{ id: "plywood", name: "Plywood", nameKey: "options.baseTypes.plywood" },
	],
	vinyl: [
		{ id: "self-leveling", name: "Self-leveling base", nameKey: "options.baseTypes.self-leveling" },
		{ id: "concrete", name: "Concrete subfloor", nameKey: "options.baseTypes.concrete" },
	],
};

export const glueCoverings = coveringTypes;

export const glueBrands: GlueBrandOption[] = [
	{
		id: "522",
		name: "522 Eurosafe Star Tack",
		nameKey: "options.glueBrands.522",
		consumptionRules: [
			{ baseTypeIds: ["cement-screed", "concrete"], trowelIds: ["a1", "a2"], value: 250 },
			{ baseTypeIds: ["cement-screed", "concrete"], trowelIds: ["b1"], value: 440 },
		],
	},
	{
		id: "640",
		name: "640 Eurostar Special",
		nameKey: "options.glueBrands.640",
		consumptionRules: [
			{ baseTypeIds: ["cement-screed", "concrete", "self-leveling"], trowelIds: ["a1", "a2"], value: 280 },
			{ baseTypeIds: ["cement-screed", "concrete", "self-leveling"], trowelIds: ["b1"], value: 420 },
		],
	},
	{
		id: "628",
		name: "628 Eurostar Rapid",
		nameKey: "options.glueBrands.628",
		consumptionRules: [
			{ baseTypeIds: ["concrete", "self-leveling"], trowelIds: ["a2"], value: 320 },
			{ baseTypeIds: ["concrete", "self-leveling"], trowelIds: ["b1"], value: 450 },
		],
	},
];

export const glueFloorBases: FloorBaseOption[] = [
	{
		id: "concrete",
		name: "Concrete subfloor",
		nameKey: "options.glueFloorBases.concrete.name",
		primerHint: "Primer: 044 Europrimer Multi",
		primerHintKey: "options.glueFloorBases.concrete.primerHint",
	},
	{
		id: "cement-screed",
		name: "Cement screed",
		nameKey: "options.glueFloorBases.cement-screed.name",
		primerHint: "Primer: 044 Europrimer Multi or 045 Eurobond",
		primerHintKey: "options.glueFloorBases.cement-screed.primerHint",
	},
	{
		id: "gypsum",
		name: "Gypsum subfloor",
		nameKey: "options.glueFloorBases.gypsum.name",
		primerHint: "Primer: 044 Europrimer Multi",
		primerHintKey: "options.glueFloorBases.gypsum.primerHint",
	},
];

export const glueTrowels: MockOption[] = [
	{ id: "a1", name: "A1", nameKey: "options.glueTrowels.a1" },
	{ id: "a2", name: "A2", nameKey: "options.glueTrowels.a2" },
	{ id: "b1", name: "B1", nameKey: "options.glueTrowels.b1" },
];

const materialCoveringsById: Record<string, string[]> = {
	"primer-044": ["linoleum", "carpet", "vinyl"],
	"primer-045": ["linoleum", "vinyl"],
	"primer-deep": ["linoleum", "carpet"],
	"level-300": ["linoleum", "carpet"],
	"level-500": ["linoleum", "vinyl"],
	"screed-pro": ["carpet", "vinyl"],
	"522": ["linoleum", "carpet"],
	"640": ["linoleum", "vinyl"],
	"628": ["vinyl"],
};

const getMaterialCoverings = (item: MockOption) => materialCoveringsById[item.id] ?? [];

export const materialNames: MaterialOption[] = [
	...soilProducts.map((item) => ({ ...item, sectionId: "soil" as const, coveringTypeIds: getMaterialCoverings(item) })),
	...floorProducts.map((item) => ({ ...item, sectionId: "floor" as const, coveringTypeIds: getMaterialCoverings(item) })),
	...glueBrands.map((item) => ({ ...item, sectionId: "glue" as const, coveringTypeIds: getMaterialCoverings(item) })),
];

export const getBaseTypesByCovering = (coveringTypeId?: string) => {
	if (!coveringTypeId) {
		return [];
	}

	return baseTypesByCovering[coveringTypeId] ?? [];
};

export const getMaterialNamesBySection = (sectionId?: string, coveringTypeId?: string) => {
	const sectionMaterials = !sectionId || sectionId === "all" ? materialNames : materialNames.filter((item) => item.sectionId === sectionId);

	if (!coveringTypeId) {
		return [];
	}

	return sectionMaterials.filter((item) => item.coveringTypeIds.includes(coveringTypeId));
};

export const getSoilDilutionByMaterial = (materialId?: string) => {
	const soilProduct = soilProducts.find((item) => item.id === materialId);

	if (!soilProduct) {
		return null;
	}

	return soilDilutions.find((item) => item.id === soilProduct.dilutionId) ?? null;
};
