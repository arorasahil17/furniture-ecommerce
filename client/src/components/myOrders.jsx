import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, initCart } from "../redux/actions";
import Loader from "./loader";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(authenticate());
    dispatch(initCart());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container lg:px-64 sm:px-12 max-sm:px-6 mt-24">
          <h2 className="text-2xl font-semibold text-slate-800">My Orders</h2>
          {user.orders.length > 0 ? (
            user.orders.map((order) => {
              const totalPrice = order.products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              );
              return (
                <>
                  <h6 className="text-sm text-gray-600 font-semibold mt-12 underline">
                    Order ID: {order._id}
                  </h6>
                  <div
                    className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2"
                    key={order._id}
                  >
                    <table className="w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-600 uppercase bg-gray-100 ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((product, index) => {
                          return (
                            <>
                              <tr
                                className=" border-b white:bg-gray-800 white:border-gray-700"
                                key={index}
                              >
                                <td className="px-6 py-4 font-medium text-gray-500 ">
                                  {product.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                  ₹{product.price}
                                </td>
                                <td className="px-6 py-4 text-gray-500 uppercase">
                                  {product.category}
                                </td>
                                <td className="px-12 py-4 text-gray-500">
                                  {product.quantity}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-4 font-medium text-gray-600"
                          >
                            Subtotal
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-600">
                            ₹ {totalPrice}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })
          ) : (
            <h3 className="text-center text-2xl mt-24 text-blue-600">
              You have no orders history
            </h3>
          )}
        </div>
      )}
    </>
  );
}
