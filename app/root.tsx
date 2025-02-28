import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError
} from "@remix-run/react";
import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Providers } from "./providers";
import { Sonner } from "@/ui/toast";
import globalStyles from "./styles/globals.scss?url";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
  },
  { rel: "stylesheet", href: globalStyles }
];

export function Layout({ children }) {
  return (
    <html lang="en" className="font-dmsans">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <Sonner />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    console.error(error);
    return (
      <>
        <h1>Error!</h1>
        <p>{!error.message}</p>
      </>
    );
  }
  return (
    <>
      <h1>Error!</h1>
      <p>Unknown error</p>
    </>
  );
}
