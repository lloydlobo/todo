import type { AppProps } from "next/app";
import { StoreProvider } from "../lib/Store";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
