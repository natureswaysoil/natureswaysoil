
export type CartItem = { slug:string; title:string; price:number; qty:number; sku?:string };
export type Cart = { items: CartItem[]; shipping:number; tax:number; subtotal:number; total:number };
export function inferShipping(title:string){
  const t = title.toLowerCase();
  if(t.includes("2.5")) return 30.00;
  if(t.includes("32 oz") || t.includes("32-ounce") || t.includes("32oz")) return 7.00;
  return 10.00;
}
export function calculate(cart: Cart): Cart {
  const subtotal = cart.items.reduce((s, it)=> s + it.price * it.qty, 0);
  const shipping = cart.items.length ? Math.max(...cart.items.map(it => inferShipping(it.title))) : 0;
  const tax = 0;
  const total = subtotal + shipping + tax;
  return { ...cart, subtotal, shipping, tax, total };
}
