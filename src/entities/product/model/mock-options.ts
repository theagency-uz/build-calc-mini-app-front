export type MockOption = {
	id: string;
	name: string;
	nameKey?: string;
};

export type FloorBaseOption = MockOption & {
	primerHint: string;
	primerHintKey?: string;
};

export type MaterialOption = MockOption & {
	sectionId: "soil" | "floor" | "glue";
};

export const calculationSections: MockOption[] = [
	{ id: "all", name: "All", nameKey: "options.sections.all" },
	{ id: "soil", name: "Primer", nameKey: "options.sections.soil" },
	{ id: "floor", name: "Floor", nameKey: "options.sections.floor" },
	{ id: "glue", name: "Adhesive", nameKey: "options.sections.glue" },
];

export const soilProducts: MockOption[] = [
	{ id: "primer-044", name: "044 Europrimer Multi", nameKey: "options.soilProducts.primer-044" },
	{ id: "primer-045", name: "045 Eurobond", nameKey: "options.soilProducts.primer-045" },
	{ id: "primer-deep", name: "Deep penetration primer", nameKey: "options.soilProducts.primer-deep" },
];

export const soilDilutions: MockOption[] = [
	{ id: "ready", name: "Ready-to-use", nameKey: "options.soilDilutions.ready" },
	{ id: "1-1", name: "1:1", nameKey: "options.soilDilutions.1-1" },
	{ id: "1-2", name: "1:2", nameKey: "options.soilDilutions.1-2" },
];

export const soilBaseTypes: MockOption[] = [
	{ id: "absorbing", name: "Absorbent", nameKey: "options.soilBaseTypes.absorbing" },
	{ id: "non-absorbing", name: "Non-absorbent", nameKey: "options.soilBaseTypes.non-absorbing" },
];

export const floorProducts: MockOption[] = [
	{ id: "level-300", name: "Self-leveling floor Level 300", nameKey: "options.floorProducts.level-300" },
	{ id: "level-500", name: "Leveling compound Level 500", nameKey: "options.floorProducts.level-500" },
	{ id: "screed-pro", name: "Screed Pro", nameKey: "options.floorProducts.screed-pro" },
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

export const glueBrands: MockOption[] = [
	{ id: "522", name: "522 Eurosafe Star Tack", nameKey: "options.glueBrands.522" },
	{ id: "640", name: "640 Eurostar Special", nameKey: "options.glueBrands.640" },
	{ id: "628", name: "628 Eurostar Rapid", nameKey: "options.glueBrands.628" },
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

export const materialNames: MaterialOption[] = [
	...soilProducts.map((item) => ({ ...item, sectionId: "soil" as const })),
	...floorProducts.map((item) => ({ ...item, sectionId: "floor" as const })),
	...glueBrands.map((item) => ({ ...item, sectionId: "glue" as const })),
];

export const getBaseTypesByCovering = (coveringTypeId?: string) => {
	if (!coveringTypeId) {
		return [];
	}

	return baseTypesByCovering[coveringTypeId] ?? [];
};

export const getMaterialNamesBySection = (sectionId?: string) => {
	if (!sectionId || sectionId === "all") {
		return materialNames;
	}

	return materialNames.filter((item) => item.sectionId === sectionId);
};
