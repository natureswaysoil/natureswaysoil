 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/scripts/generate-products.js b/scripts/generate-products.js
index 3b1069248d1ebb1f4f7a3cc772a7cd88918b353b..92bb915bce1bc7894e63e63c7a93616f2e0f79e3 100644
--- a/scripts/generate-products.js
+++ b/scripts/generate-products.js
@@ -1,31 +1,31 @@
 const fs = require('fs');
 const path = require('path');
 
-const src = path.join(__dirname, '..', 'Products (10).csv');
+const src = path.join(__dirname, '..', 'products.csv');
 const out = path.join(__dirname, '..', 'data', 'products.json');
-const imagesSrc = path.join(__dirname, '..', 'product images for website.txt');
+const imagesSrc = path.join(__dirname, '..', 'product-images.txt');
 
 const raw = fs.readFileSync(src, 'utf8').trim();
 const lines = raw.split(/\r?\n/).slice(1); // skip header
 
 // Build an image mapping where the key is product ID and the value
 // is an array of image paths. Lines in the mapping file are in the
 // format `1. /path/to/image.jpg`.
 const imageMap = {};
 if (fs.existsSync(imagesSrc)) {
   const imgRaw = fs.readFileSync(imagesSrc, 'utf8');
   imgRaw.split(/\r?\n/).forEach((line) => {
     const match = line.match(/^\s*(\d+)\.\s*(.+)$/);
     if (match) {
       const id = Number(match[1]);
       const paths = match[2].split(/\s+/).filter(Boolean);
       if (paths.length) {
         imageMap[id] = paths;
       }
     }
   });
 }
 
 const products = lines.map((line) => {
   const [id, title, description, price, active, sku] = line.split(',');
   return {
 
EOF
)
