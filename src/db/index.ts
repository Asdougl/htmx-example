import { todosDb } from "./todos";

export type DBEntry<T extends { id: string }> = {
  getAll: () => Promise<T[]>;
  getOne: (id: string) => Promise<T | undefined>;
  create: (data: Omit<T, "id">) => Promise<T[]>;
  update: (data: Pick<T, "id"> & Partial<Omit<T, "id">>) => Promise<T[]>;
  delete: (id: string) => Promise<T[]>;
};

type DB = {
  [item: string]: DBEntry<any>;
};

export const db = {
  todos: todosDb,
} satisfies DB;
