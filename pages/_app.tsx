import type { AppProps } from "next/app";
import "@/styles/globals.css"; // If @ alias isn't set, use: "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

