import Head from "next/head";
import { useRouter } from "next/router";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage(){
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : undefined;
  const qtyParam = typeof router.query.qty === "string" ? parseInt(router.query.qty) : 1;

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-6 py-16">
      <Head><title>Checkout – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <CheckoutForm slug={slug} qty={qtyParam}/>
    </main>
  );
}


