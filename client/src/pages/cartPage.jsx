import { useSelector } from "react-redux";
import Cart from "../components/cart";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.items);
  const products = cartItems.products;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Cart products={products} />
          <Footer />
        </>
      )}
    </>
  );
}
