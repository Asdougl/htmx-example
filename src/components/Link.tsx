import { FC } from "hono/jsx";

export const Link: FC<{ href: string }> = ({ href, children }) => {
  return (
    <a
      href={href}
      hx-get={href}
      hx-swap="outerHTML"
      hx-target="body"
      hx-push-url="true"
    >
      {children}
    </a>
  );
};
