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
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Navigation } from "./components/layout/Navigation";
export const loader = () => {
  return {
    env: getEnv()
  };
};
import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  // Google Fonts
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
];

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  { title: "Re:hive Space - Tech Blog" },
  { name: "description", content: "A modern tech blog built with Remix and Directus" },
];

export default function App() {
  const { env } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-surface-50 text-primary-700 font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)};`,
          }}
        />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-border-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-primary-900">Re:hive Space</span>
            </div>
            <p className="text-primary-600 mb-6 max-w-md">
              A modern tech blog where ideas flourish and insights come to life. 
              Discover thoughtful perspectives on technology, innovation, and the future.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-600 hover:text-accent-600 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-600 hover:text-accent-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-600 hover:text-accent-600 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-600 hover:text-accent-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="text-primary-600 hover:text-accent-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" className="text-primary-600 hover:text-accent-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-600 hover:text-accent-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog?category=web-development" className="text-primary-600 hover:text-accent-600 transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="/blog?category=javascript" className="text-primary-600 hover:text-accent-600 transition-colors">
                  JavaScript
                </a>
              </li>
              <li>
                <a href="/blog?category=react" className="text-primary-600 hover:text-accent-600 transition-colors">
                  React
                </a>
              </li>
              <li>
                <a href="/blog?category=tutorials" className="text-primary-600 hover:text-accent-600 transition-colors">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-light">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-600 mb-4 md:mb-0">
              © 2025 Re:hive Space. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-primary-600 hover:text-accent-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-primary-600 hover:text-accent-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}