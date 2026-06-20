import { useEffect, useState } from "react";

import { getProductDictionaries } from "../api";

import { emptyProductDictionaries } from "./mock-options";
import type { ProductDictionaries } from "./mock-options";

export const useProductDictionaries = () => {
	const [dictionaries, setDictionaries] = useState<ProductDictionaries>(emptyProductDictionaries);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		let isMounted = true;

		getProductDictionaries()
			.then((data) => {
				if (!isMounted) {
					return;
				}

				setDictionaries(data);
				setIsError(false);
			})
			.catch(() => {
				if (isMounted) {
					setIsError(true);
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		dictionaries,
		isError,
		isLoading,
	};
};
