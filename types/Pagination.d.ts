export type Pagination = {
  readonly itemsCount: number;
  readonly currentPage: number;
  readonly totalPages: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
};
