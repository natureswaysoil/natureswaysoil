
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'products.csv');
const out = path.join(__dirname, '..', 'data', 'products.json');
const imagesSrc = path.join(__dirname, '..', 'product-images.txt');
 
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
  // Remove quotes from title and sku
  const cleanTitle = title.replace(/^"|"$/g, '');
  const cleanSku = sku.replace(/^"|"$/g, '');
  // Generate slug from title
  const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  // Use first image if available, else fallback to /products/{id}.jpg
  const images = imageMap[Number(id)] || [];
  const image = images.length > 0 ? images[0] : `/products/${id}.jpg`;
  return {
    id: Number(id),
    title: cleanTitle,
    description: description.replace(/^"|"$/g, ''),
    price: Number(price),
    active: active === 'true',
    sku: cleanSku,
    images,
    slug,
    image
  };
});

fs.writeFileSync(out, JSON.stringify(products, null, 2));

