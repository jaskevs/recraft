import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getEnv } from './utils/env.server';
//ts error
import Navigation from "./components/Navigation";
export const loader = () => {
  return {
    env: getEnv()
  };
};

export default function App() {
  const { env } = useLoaderData<typeof loader>();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)};`,
          }}
        />
        <Navigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}