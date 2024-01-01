import { readFile, writeFile, mkdir } from "fs/promises";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { DBEntry } from ".";

export const Todo = z.object({
  id: z.string(),
  text: z.string(),
  isComplete: z.boolean(),
});
export type Todo = z.infer<typeof Todo>;

const getTodos = async () => {
  try {
    const todos = await readFile("./data/todos.json", "utf8");
    return Todo.array().parse(JSON.parse(todos));
  } catch (error) {
    await mkdir("./data", { recursive: true });
    await writeFile("./data/todos.json", "[]");
    return [];
  }
};

const findTodo = async (id: string) => {
  const todos = await getTodos();
  return todos.find((t) => t.id === id);
};

const addTodo = async (todo: Pick<Todo, "text">) => {
  const todos = await getTodos();
  const newTodos = [
    ...todos,
    {
      id: uuid(),
      text: todo.text,
      isComplete: false,
    },
  ];
  await writeFile("./todos.json", JSON.stringify(newTodos));
  return newTodos;
};

const updateTodo = async (
  todo: Pick<Todo, "id"> & Partial<Omit<Todo, "id">>
) => {
  const todos = await getTodos();
  let updatedTodo: Todo | undefined;
  const newTodos = todos.map((t) => {
    if (t.id === todo.id) {
      updatedTodo = { ...t, ...todo };
      return updatedTodo;
    }
    return t;
  });
  if (updatedTodo) {
    await writeFile("./todos.json", JSON.stringify(newTodos));
  }
  return newTodos;
};

const deleteTodo = async (id: string) => {
  const todos = await getTodos();
  const newTodos = todos.filter((t) => t.id !== id);
  await writeFile("./todos.json", JSON.stringify(newTodos));
  return newTodos;
};

export const todosDb: DBEntry<Todo> = {
  getAll: getTodos,
  getOne: findTodo,
  create: addTodo,
  update: updateTodo,
  delete: deleteTodo,
};
