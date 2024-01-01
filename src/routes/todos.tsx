import { Hono } from "hono";
import z from "zod";
import { Todo, db } from "~/db";
import { HTML } from "~/components/layout/html";

export const todosRouter = new Hono();

const TodoItem = ({ todo }: { todo: Todo }) => (
  <li id={`todo-${todo.id}`} class="flex items-center gap-2">
    <button
      hx-patch={`todos/${todo.id}?status=${todo.isComplete ? "todo" : "done"}`}
      hx-swap="innerHTML"
      hx-target="#todos-list"
      hx-trigger="click"
      class="border-2 rounded border-neutral-800 h-6 w-6 flex items-center justify-center hover:text-opacity-50"
    >
      {todo.isComplete ? "✓" : ""}
    </button>
    <span>{todo.text}</span>
    {todo.isComplete && (
      <button
        hx-delete={`todos/${todo.id}`}
        hx-target="#todos-list"
        hx-swap="outerHTML"
        hx-trigger="click"
        class="border-2 rounded border-neutral-800 h-6 w-6 flex items-center justify-center hover:text-opacity-50"
      >
        🗑
      </button>
    )}
  </li>
);

const TodosList = ({ todos }: { todos: Todo[] }) => (
  <ul id="todos-list">
    {todos.length ? (
      todos.map((todo) => <TodoItem todo={todo} />)
    ) : (
      <li>No todos</li>
    )}
  </ul>
);

todosRouter.get("/", async (c) => {
  const todos = await db.todos.getAll();

  return c.html(
    <HTML>
      <h1 class="text-4xl font-bold">Todos</h1>
      <TodosList todos={todos} />
      <form
        hx-post="/todos"
        hx-target="#todos-list"
        hx-swap="innerHTML"
        hx-on:submit="this.reset()"
      >
        <input type="text" name="text" />
        <button>Add</button>
      </form>
    </HTML>
  );
});

todosRouter.post("/", async (c) => {
  const body = await c.req.parseBody();

  console.log(body);

  const text = z.object({ text: z.string() }).parse(body).text;

  const todos = await db.todos.create({
    text,
    isComplete: false,
  });

  return c.html(<TodosList todos={todos} />);
});

todosRouter.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const status = c.req.query("status");

  const todos = await db.todos.update({
    id,
    isComplete: status === "done",
  });

  return c.html(<TodosList todos={todos} />);
});

todosRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const todos = await db.todos.delete(id);

  return c.html(<TodosList todos={todos} />);
});
