// scripts/generate-products.js
const fs = require('fs');
const path = require('path');

// Image mapping from the text file
const imageMap = {
  1: '/products/organic-liquid-1gal.jpg',
  2: '/products/tomato-1gal.jpg',
  3: '/products/kelp-1gal.jpg',
  4: '/products/premium-soil-2cf.jpg',
  5: '/products/worm-casting-1gal.jpg',
  6: '/products/root-booster-32oz.jpg',
  7: '/products/starter-kit.jpg',
  8: '/products/compost-tea-1gal.jpg',
  9: '/products/lawn-food-2gal.jpg',
  10: '/products/ph-balancer-16oz.jpg'
};

function createSlugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function parseCSVProducts() {
  try {
    const csvPath = path.join(__dirname, '..', 'Products (10).csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    const lines = csvContent.trim().split('\n');
    const products = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const productId = parseInt(values[0]);
      const title = values[1];
      const description = values[2];
      const price = parseFloat(values[3]);
      const active = values[4].toUpperCase() === 'TRUE';
      const sku = values[5];
      
      // Only include active products as specified in requirements
      if (active) {
        const slug = createSlugFromTitle(title);
        const image = imageMap[productId] || '/placeholder-product.svg';
        
        products.push({
          slug,
          title,
          description,
          price,
          image,
          active: true,
          sku
        });
      }
    }
    
    return products;
  } catch (error) {
    console.error('Error parsing CSV products:', error);
    return [];
  }
}

// Generate the products JSON file
const products = parseCSVProducts();
const outputPath = path.join(__dirname, '..', 'data', 'products.json');
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products to ${outputPath}`);