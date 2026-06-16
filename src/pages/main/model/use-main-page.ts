import { useState } from "react";

import type { CalculationResult } from "@/entities/calculator/model";

export function useMainPage() {
	const [result, setResult] = useState<CalculationResult | null>(null);

	return {
		result,
		setResult,
		clearResult: () => setResult(null),
	};
}
