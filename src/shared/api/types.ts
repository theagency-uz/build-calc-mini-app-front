export type PayloadListResponse<T> = {
	docs: T[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage?: number | null;
	prevPage?: number | null;
};

