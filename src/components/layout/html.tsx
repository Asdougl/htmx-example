import { Child, FC } from "hono/jsx";

export const HTML: FC<{ children: Child; title?: string }> = ({
  children,
  title,
}) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <link rel="stylesheet" href="./static/index.css" />
      <title>{title || "Bun Hono HTMX"}</title>
    </head>
    <body>{children}</body>
  </html>
);
