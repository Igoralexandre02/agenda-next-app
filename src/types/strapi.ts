export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> extends StrapiResponse<T[]> {
  meta: {
    pagination: StrapiPagination;
  };
}

export interface StrapiItemResponse<T> extends StrapiResponse<T> {
  meta: Record<string, unknown>;
}
