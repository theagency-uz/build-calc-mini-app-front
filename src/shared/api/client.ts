const API_URL = import.meta.env.VITE_API_URL;

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const getApiUrl = (path: string, params?: QueryParams) => {
	if (!API_URL) {
		throw new Error("VITE_API_URL is not defined");
	}

	const url = new URL(`${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`);

	Object.entries(params ?? {}).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.set(key, String(value));
		}
	});

	return url;
};

export const apiGet = async <T>(path: string, params?: QueryParams): Promise<T> => {
	const response = await fetch(getApiUrl(path, params));

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status}`);
	}

	return response.json() as Promise<T>;
};

