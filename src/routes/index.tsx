import { Hono } from "hono";
import { HTML } from "~/components/layout/html";
import { db } from "~/db";
import { Link } from "~/components/Link";

export const indexRouter = new Hono();

indexRouter.get("/", async (c) => {
  const todos = await db.todos.getAll();

  return c.html(
    <HTML>
      <h1 class="text-4xl font-bold">Todos App</h1>
      <Link href="/todos">Todos ({todos.length})</Link>
    </HTML>
  );
});
