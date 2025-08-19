import type { AppProps } from "next/app";
import "@/styles/globals.css"; // If @ alias isn't set, use: "../styles/globals.css"
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

