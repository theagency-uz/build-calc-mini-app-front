import type { TFunction } from "i18next";

import type { MockOption } from "@/entities/product/model";

export const translateOptions = <TOption extends MockOption>(options: TOption[], t: TFunction) =>
	options.map((option) => ({
		...option,
		name: option.nameKey ? t(option.nameKey) : option.name,
	}));
