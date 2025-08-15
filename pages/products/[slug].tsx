
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getProduct, products } from "@/lib/products";

export default function ProductDetail(){
  const router = useRouter();
  const { slug } = router.query;
  const product = getProduct(String(slug));
  if(!product) return <main className="p-10">Product not found.</main>;

  return (
    <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <Head><title>{product.title} – Nature’s Way Soil</title></Head>
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-2xl">${"{product.price.toFixed(2)}"}</p>
      <div className="mt-6 flex gap-3">
        <a href={`/checkout?slug=${"{product.slug}"}&qty=1`} className="px-6 py-3 rounded-2xl bg-green-700 text-white">Buy</a>
        <Link href="/products" className="px-6 py-3 rounded-2xl border">Back</Link>
      </div>
    </main>
  );
}

export async function getStaticPaths(){ return { paths: products.map(p=>({ params: { slug: p.slug } })), fallback: true }; }
export async function getStaticProps(){ return { props: {} }; }
