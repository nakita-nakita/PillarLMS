import { Model } from "sequelize";

export type findAndCountAll<T> = {
  // rows: Model<T>[];
  rows: Model<T, T>[];
  count: number;
  page?: number;
  pageSize?: number;
  pageCount?: number;
}
