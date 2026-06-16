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

const findName = (options: MockOption[], id?: string) => options.find((item) => item.id === id)?.name ?? "Не выбрано";

const resultBySection: Record<CalculatorMode, Pick<CalculationResult, "title" | "subtitle" | "amount" | "unit" | "packageCount" | "packageUnit" | "note">> = {
	all: {
		title: "Комплексный расход материалов",
		subtitle: "Моковый расчет по всем разделам",
		amount: 445.5,
		unit: "кг/л",
		packageCount: 21,
		packageUnit: "позиций",
		note: "Итог объединяет моковые значения по клею, грунтовке и полу.",
	},
	glue: {
		title: "Расход клея",
		subtitle: "Подбор под выбранное покрытие",
		amount: 12,
		unit: "кг",
		packageCount: 2,
		packageUnit: "ведра",
		note: "Перед нанесением проверьте основание и выдержку грунтовки.",
	},
	soil: {
		title: "Расход грунта",
		subtitle: "Материал подготовлен с учетом основания",
		amount: 8.5,
		unit: "л",
		packageCount: 2,
		packageUnit: "канистры",
		note: "Рекомендуем округлить закупку в большую сторону.",
	},
	floor: {
		title: "Расход смеси для пола",
		subtitle: "Расчет по площади и толщине слоя",
		amount: 425,
		unit: "кг",
		packageCount: 17,
		packageUnit: "мешков",
		note: "Для ровного слоя держите запас по мешкам на объекте.",
	},
};

export const getUnifiedMockResult = (values: UnifiedCalculationValues): CalculationResult => {
	const sectionResult = resultBySection[values.sectionId];
	const dynamicDetails = [
		isGlueIncluded(values.sectionId) ? { label: "Шпатель", value: findName(glueTrowels, values.trowelId) } : null,
		isSoilIncluded(values.sectionId) ? { label: "Разбавление", value: findName(soilDilutions, values.dilutionId) } : null,
		isFloorIncluded(values.sectionId) ? { label: "Толщина слоя", value: `${values.layerThickness} мм` } : null,
	].filter((item): item is { label: string; value: string } => Boolean(item));

	return {
		kind: values.sectionId,
		...sectionResult,
		details: [
			{ label: "Раздел расчета", value: findName(calculationSections, values.sectionId) },
			{ label: "Площадь", value: `${values.area} m2` },
			{ label: "Тип покрытия", value: findName(coveringTypes, values.coveringTypeId) },
			{ label: "Тип основания", value: findName(getBaseTypesByCovering(values.coveringTypeId), values.baseTypeId) },
			{ label: "Материал", value: findName(materialNames, values.materialId) },
			...dynamicDetails,
		],
	};
};
