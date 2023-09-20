import { useEffect, useState } from "react";
import Checkout from "../components/checkout";
import Footer from "../components/footer";
import { useDispatch } from "react-redux";
import { authenticate, initCart } from "../redux/actions";
import Loader from "../components/loader";

export default function CheckOutPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(initCart());
    dispatch(authenticate());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <Checkout />
          <Footer />
        </>
      )}
    </>
  );
}
