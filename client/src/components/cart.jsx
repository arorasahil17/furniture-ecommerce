import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart, updateCart } from "../redux/actions";

export default function Cart({ products }) {
  const dispatch = useDispatch();
  const totalPrice = products?.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10); // Parse the input value to an integer
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Check if the new quantity is a valid number and greater than or equal to 1
      dispatch(updateCart(productId, newQuantity)); // Dispatch an action to update the cart with the new quantity
    }
  };
  return (
    <>
      <div className="container lg:px-24">
        <div className="container mt-24">
          {products.length ? (
            <>
              <div className="flex h-full flex-col  bg-white shadow">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.image}
                                alt="cart product"
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">₹{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty{" "}
                                  <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(e, product._id)
                                    }
                                    className="w-12 px-2 py-0 border outline-none border-gray-400 rounded"
                                  />
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-danger-400 hover:text-danger-600"
                                    onClick={() =>
                                      dispatch(deleteCart(product._id))
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{totalPrice}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link
                      to="/"
                      className="font-medium text-gray-900 hover:text-gray-800 mx-2"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <p className="text-base font-semibold text-red-600">Oops!</p>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Your cart is empty
                  </h1>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    Your shopping cart is currently empty. Start adding items to
                    your cart to make a purchase.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-x-6">
                    <Link
                      to="/"
                      className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm  text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Shopping Now
                    </Link>
                  </div>
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
}
