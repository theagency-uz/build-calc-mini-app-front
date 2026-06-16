export type MockOption = {
	id: string;
	name: string;
};

export type FloorBaseOption = MockOption & {
	primerHint: string;
};

export type MaterialOption = MockOption & {
	sectionId: "soil" | "floor" | "glue";
};

export const calculationSections: MockOption[] = [
	{ id: "all", name: "Все" },
	{ id: "soil", name: "Грунтовка" },
	{ id: "floor", name: "Пол" },
	{ id: "glue", name: "Клей" },
];

export const soilProducts: MockOption[] = [
	{ id: "primer-044", name: "044 Europrimer Multi" },
	{ id: "primer-045", name: "045 Eurobond" },
	{ id: "primer-deep", name: "Грунт глубокого проникновения" },
];

export const soilDilutions: MockOption[] = [
	{ id: "ready", name: "Готовый состав" },
	{ id: "1-1", name: "1:1" },
	{ id: "1-2", name: "1:2" },
];

export const soilBaseTypes: MockOption[] = [
	{ id: "absorbing", name: "Впитывающее" },
	{ id: "non-absorbing", name: "Не впитывающее" },
];

export const floorProducts: MockOption[] = [
	{ id: "level-300", name: "Наливной пол Level 300" },
	{ id: "level-500", name: "Ровнитель Level 500" },
	{ id: "screed-pro", name: "Стяжка Screed Pro" },
];

export const coveringTypes: MockOption[] = [
	{ id: "linoleum", name: "Линолеум" },
	{ id: "carpet", name: "Ковролин" },
	{ id: "vinyl", name: "ПВХ плитка" },
];

export const baseTypesByCovering: Record<string, MockOption[]> = {
	linoleum: [
		{ id: "cement-screed", name: "Цементная стяжка" },
		{ id: "concrete", name: "Бетонное основание" },
	],
	carpet: [
		{ id: "cement-screed", name: "Цементная стяжка" },
		{ id: "plywood", name: "Фанера" },
	],
	vinyl: [
		{ id: "self-leveling", name: "Наливное основание" },
		{ id: "concrete", name: "Бетонное основание" },
	],
};

export const glueCoverings = coveringTypes;

export const glueBrands: MockOption[] = [
	{ id: "522", name: "522 Eurosafe Star Tack" },
	{ id: "640", name: "640 Eurostar Special" },
	{ id: "628", name: "628 Eurostar Rapid" },
];

export const glueFloorBases: FloorBaseOption[] = [
	{
		id: "concrete",
		name: "Бетонное основание",
		primerHint: "Грунтовка: 044 Europrimer Multi",
	},
	{
		id: "cement-screed",
		name: "Цементная стяжка",
		primerHint: "Грунтовка: 044 Europrimer Multi или 045 Eurobond",
	},
	{
		id: "gypsum",
		name: "Гипсовое основание",
		primerHint: "Грунтовка: 044 Europrimer Multi",
	},
];

export const glueTrowels: MockOption[] = [
	{ id: "a1", name: "A1" },
	{ id: "a2", name: "A2" },
	{ id: "b1", name: "B1" },
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
