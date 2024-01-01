import { Hono } from "hono";
import { HTML } from "~/components/layout/html";

export const storeRouter = new Hono();

storeRouter.get("/", async (c) => {
  return c.html(
    <HTML>
      <div className="container mx-auto">
        <h1 class="text-4xl font-bold">Store</h1>
      </div>
    </HTML>
  );
});
