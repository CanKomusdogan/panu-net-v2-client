export interface ServerDataTableOptions<T extends string> {
  page?: number;
  itemsPerPage?: number;
  sort?: T;
  search?: string;
}
