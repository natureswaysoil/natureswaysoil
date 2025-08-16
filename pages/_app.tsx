import type { AppProps } from "next/app";
import "@/styles/globals.css"; // <-- loads Tailwind

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
