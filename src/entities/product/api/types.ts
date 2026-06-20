type BaseEntity = {
	id: number;
	title: string;
	code: string;
	createdAt: string;
	updatedAt: string;
};

export type ApiBaseType = BaseEntity & {
	primerHint?: string | null;
};

export type ApiCoveringType = BaseEntity & {
	baseTypes: ApiBaseType[];
};

export type ApiBrand = BaseEntity;

export type ApiTrowel = BaseEntity;

export type ApiSoilDilution = BaseEntity & {
	concentrateParts: number;
	waterParts: number;
};

export type ApiGlueProduct = BaseEntity & {
	brand?: ApiBrand | number | null;
	coverings: ApiCoveringType[];
	trowels: ApiTrowel[];
	consumptionRules?: {
		id?: string | null;
		baseTypes: ApiBaseType[];
		trowels: ApiTrowel[];
		value: number;
	}[] | null;
};

export type ApiSoilProduct = BaseEntity & {
	brand?: ApiBrand | number | null;
	coverings: ApiCoveringType[];
	dilution: ApiSoilDilution | number;
	consumptionReadyGramsPerM2: number;
};

export type ApiFloorProduct = BaseEntity & {
	brand?: ApiBrand | number | null;
	coverings: ApiCoveringType[];
	consumption: number;
};

