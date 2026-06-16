export type CalculatorKind = "soil" | "floor" | "glue";
export type CalculatorMode = "all" | CalculatorKind;

export type CalculationResult = {
	kind: CalculatorMode;
	title: string;
	subtitle: string;
	amount: number;
	unit: string;
	packageCount: number;
	packageUnit: string;
	note: string;
	details: {
		label: string;
		value: string;
	}[];
};
