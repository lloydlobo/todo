import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { CounterProvider, StoreProvider } from "../lib/Counter";
import "../styles/globals.css";

// https://tanstack.com/query/v4/docs/guides/ssr#using-hydration
export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {/* Hydrate component will hydrate the queryClient with the cached data
            we fetched on the server. The prop is for the dehydrated state which
            is hydrated on the client. So for the hydration to work, we will
            need to return the dehydrated cache with the dehydratedState prop
            from the getStaticProps method that we'll be using for the
            pages/pokemon/[id].tsx page. */}
            <Hydrate state={pageProps.dehydratedState}>
                <CounterProvider>
                    <Component {...pageProps} />
                </CounterProvider>
            </Hydrate>
            {/* Devtools work in app's bundle only when
            process.env.NODE_ENV === 'development' */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

// https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/
// Mastering data fetching with React Query and Next.js
// @prateeksurananme/blog/mas....
// <ReactQueryDevtools initialIsOpen={false} />

/**
 * - dehydrating queries - Dehydration refers to creating a frozen
 * representation of the cache. This can be later hydrated on the
 * browser with React Query's hydrate methods. This is useful if you
 * want to store the cache for later use, for instance in localstorage
 * or in our case sending the cache from server to client.
 * - hydrating queries - Hydration lets you add any previously dehydrated state
 * to the cache on a QueryClient instance with the full functionality of the
 * library when the app is rendering on the browser.
 * @source https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 */
