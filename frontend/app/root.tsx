import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Link,
} from "@remix-run/react";
import { getEnv } from './utils/env.server';
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Navigation } from "./components/layout/Navigation";
export const loader = () => {
  return {
    env: getEnv()
  };
};
import minimalistStylesUrl from "./styles/minimalist.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" },
  { rel: "stylesheet", href: minimalistStylesUrl },
];

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { title: "reCraft - Tech Blog" },
  { name: "description", content: "A modern tech blog built with Remix and Directus" },
];

export default function App() {
  const { env } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)};`,
          }}
        />
        <Navigation />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="minimal-footer">
      <div className="container">
        <div className="minimal-footer-content">
          <div className="minimal-footer-text">
            © 2025 reCraft. Thoughtful writing on design, technology, and culture.
          </div>
          <div className="minimal-footer-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="mailto:hello@recraft.dev">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}