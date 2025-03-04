import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import './tailwind.css';
import { ClerkApp } from '@clerk/remix';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];
export const loader: LoaderFunction = (args) => rootAuthLoader(args);
export function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError(error: any) {
          if (error.response.status !== 500)
            toast.error(error.response.data.error);
          else toast.error(`Ineternal server error`);
          console.error(error);
        },
      },
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      },
    },
  });
  const persister = createSyncStoragePersister({
    storage: typeof window!=="undefined" ? window.localStorage : null,
  });
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="max-h-screen  overflow-hidden">
        <Toaster />
        <PersistQueryClientProvider
          persistOptions={{ persister }}
          client={queryClient}
        >
          {children}
        </PersistQueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}
export default ClerkApp(App, {
  signUpForceRedirectUrl: '/create-bill',
  signInFallbackRedirectUrl: '/create-bill',
});
