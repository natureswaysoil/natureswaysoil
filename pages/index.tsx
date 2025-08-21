
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pages/index.tsx b/pages/index.tsx
index 9df9f49b14ea868ebfc70e336ec87fc4d16a818f..0502609d544651c370b329e0d9e8072304881ca8 100644
--- a/pages/index.tsx
+++ b/pages/index.tsx
@@ -1,31 +1,65 @@
 import Link from 'next/link';
 import Image from 'next/image';
 import { listProducts } from '@/lib/cart';
 
 export default function Home() {
   const products = listProducts();
   return (
-    <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
-      {products.map((p) => (
-        <div key={p.id} className="border rounded p-4 flex flex-col">
-          <Image
-            src={p.images[0] || '/placeholder-product.png'}
-            alt={p.title}
-            width={300}
-            height={300}
-            className="mb-2"
-          />
-          <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
-          <p className="flex-grow">{p.description}</p>
-          <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
-          <Link
-            href={`/checkout?slug=${p.slug}&qty=1`}
-            className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
-          >
-            Buy now
-          </Link>
+    <>
+      <header className="p-4 flex flex-col items-center text-center">
+        <Image
+          src="/logo.png"
+          alt="Nature's Way Soil logo"
+          width={150}
+          height={150}
+          className="mb-4"
+        />
+        <div className="max-w-prose">
+          <h1 className="text-2xl font-bold mb-2">About Us – Nature’s Way Soil®</h1>
+          <p className="mb-2">
+            At Nature’s Way Soil, our mission is simple: to bring life back to the soil, naturally.
+          </p>
+          <p className="mb-2">
+            We’re a family-run farm that saw firsthand the damage years of synthetic fertilizers had done to the land. The soil was tired, lifeless, and unable to sustain the healthy crops and pastures we needed. Instead of following the same path, we set out to restore the earth the way nature intended—through biology, not chemistry.
+          </p>
+          <h2 className="text-xl font-semibold mb-1">Our Promise</h2>
+          <ul className="list-disc list-inside mb-2 text-left">
+            <li>Safe &amp; Natural – Every product we make is safe for children, pets, and pollinators.</li>
+            <li>🪱 Microbe-Rich Formulas – We use beneficial microbes, worm castings, biochar, and natural extracts to restore soil health.</li>
+            <li>Sustainable Farming – From duckweed to compost teas, our ingredients are chosen to recycle nutrients and heal the land.</li>
+            <li>Results You Can See – Greener lawns, healthier pastures, stronger roots, and thriving gardens—without synthetic chemicals.</li>
+          </ul>
+          <h2 className="text-xl font-semibold mb-1">Why We Do It</h2>
+          <p className="mb-2">
+            Soil isn’t just dirt—it’s a living ecosystem. By nurturing the microbes and natural processes in the ground, we create healthier plants, stronger food systems, and a cleaner environment for future generations.
+          </p>
+          <p>
+            Every bottle and bag of Nature’s Way Soil® carries this commitment: to restore the balance between people, plants, and the planet.
+          </p>
         </div>
-      ))}
-    </main>
+      </header>
+      <main className="p-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
+        {products.map((p) => (
+          <div key={p.id} className="border rounded p-4 flex flex-col">
+            <Image
+              src={p.images[0] || '/placeholder-product.png'}
+              alt={p.title}
+              width={300}
+              height={300}
+              className="mb-2"
+            />
+            <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
+            <p className="flex-grow">{p.description}</p>
+            <p className="mt-2 font-bold">${p.price.toFixed(2)}</p>
+            <Link
+              href={`/checkout?slug=${p.slug}&qty=1`}
+              className="mt-4 inline-block bg-green-600 text-white px-3 py-1 rounded text-center"
+            >
+              Buy now
+            </Link>
+          </div>
+        ))}
+      </main>
+    </>
   );
 }
 
EOF
)
