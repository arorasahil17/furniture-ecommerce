import { useDispatch } from "react-redux";
import Features from "../components/features";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Products from "../components/products";
import { addToCartAC } from "../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const addToCart = (product, userId) => {
    dispatch(addToCartAC(product, userId));
  };
  return (
    <>
      <Hero />
      <Features />
      <Products addToCart={addToCart} />
      <Footer />
    </>
  );
}
