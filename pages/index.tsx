import { PRODUCTS, type Product } from "../data/products"; // or "./data/products" if you kept it inside /pages
import Cart, { type CartItem } from "../components/Cart";   // or "./components/Cart" if components live under /pages

const [items, setItems] = useState<CartItem[]>([]);
const [cartOpen, setCartOpen] = useState(false);
function addToCart(p: Product) {
  setItems((prev) => {
    const idx = prev.findIndex((i) => i.id === p.id);
    const copy = [...prev];

    if (idx >= 0) {
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
    } else {
      copy.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
    }

    return copy; // ← REQUIRED
  });

  setCartOpen(true);
}

function updateQty(id: string, qty: number) {
  setItems((prev) =>
    prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  ); // ← callback returns CartItem[]
}

function remove(id: string) {
  setItems((prev) => prev.filter((i) => i.id !== id)); // ← returns CartItem[]
}

const subtotal = useMemo(
  () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
  [items]
);
