import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { indexRouter } from "./routes";
import { todosRouter } from "./routes/todos";
import { storeRouter } from "./routes/store";

const app = new Hono();

app.route("/", indexRouter);
app.route("/todos", todosRouter);
app.route("/store", storeRouter);

app.use(
  "/static/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace("static", "public"),
  })
);

export default app;
