export class PaginatedModel<T> {
  total: number;
  totalPage: number;
  page: number;
  limit: number;
  items: T[];
}
