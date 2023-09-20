import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addAddress, placeOrder, resetUserState } from "../redux/actions";
import { useNavigate } from "react-router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Checkout() {
  const [shipAddress, setShipAddress] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const naviagate = useNavigate();
  useEffect(() => {
    if (user.success) {
      toast.success(user.success);
      dispatch(resetUserState());
    }
  }, [user.success]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });
  const products = cartItems.products;
  const productsCost = products?.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const tax = Math.floor(productsCost * 0.1);
  const shippingCost = 149;
  const totalPrice = productsCost + shippingCost + tax;
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.name = "First Name is required";
      toast.error("First Name is Required");
      return;
    }
    if (!formData.lastName) {
      errors.name = "Last Name is required";
      toast.error("Last Name is Required");
      return;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      toast.error("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Invalid email address";
      toast.error("Invalid email address");
      return;
    }
    if (!formData.phone) {
      errors.phone = "Contact Number is required";
      toast.error("Contact Number is required");
      return;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Invalid contact number";
      toast.error("Invalid Contact Number");
      return;
    }
    if (!formData.address) {
      errors.address = "Address is required";
      toast.error("Address is required");
      return;
    }
    if (!formData.city) {
      errors.city = "City is required";
      toast.error("City is required");
      return;
    }
    if (!formData.state) {
      errors.state = "State is required";
      toast.error("State is required");
      return;
    }
    if (!formData.pinCode) {
      errors.pinCode = "Pin Code is required";
      toast.error("Pin Code is required");
      return;
    }
    return Object.keys(errors).length === 0;
  };
  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      formData.contactNumber = `+91${formData.contactNumber}`;

      dispatch(addAddress(formData, user.user._id));
    }
  };
  const handlePlaceOrder = () => {
    if (!shipAddress.firstName) {
      toast.error("Please select shipping address");
    } else {
      dispatch(placeOrder(products, shipAddress, naviagate));
    }
  };

  const handleAddressSelection = (address) => {
    setShipAddress(address);
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Toaster position="center-center" reverseOrder={true} />
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]  opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Address
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={hanldeSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="state"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              State
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Pin Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                value={formData.pinCode}
                onChange={(e) =>
                  setFormData({ ...formData, pinCode: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-center text-sm text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
        </div>
      </form>
      {/* address data */}
      <div className="text-lg font-semibold mt-16 text-gray-900 mx-2">
        Select Address
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-100 dark:text-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {/* <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-gray-200 focus:ring-2 "
                  /> */}
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Pin Code
              </th>
            </tr>
          </thead>
          <tbody>
            {user.user.address.map((a, index) => {
              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="radio" // Use radio buttons for single selection
                        id={`radio-table-select-${index}`}
                        name="selectedAddress" // Use the same name for all radio buttons
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-gray-200 focus:ring-0"
                        onChange={() => handleAddressSelection(a)}
                      />
                      <label
                        htmlFor={`radio-table-select-${index}`}
                        className="sr-only"
                      >
                        radio button
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {a.firstName} {a.lastName}
                  </td>
                  <td className="px-6 py-4">{a.email}</td>
                  <td className="px-6 py-4 capitalize">{a.address}</td>
                  <td className="px-6 py-4 capitalize">{a.city}</td>
                  <td className="px-6 py-4 capitalize">{a.state}</td>
                  <td className="px-6 py-4 capitalize">{a.pinCode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* checkout */}
      <div className="mt-32 container">
        <div className="text-lg font-semibold my-8 text-gray-900 mx-10">
          Your Order Summary
        </div>
        <div className="container -mt-2 lg:px-10 pb-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 ">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.image}
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
                      <p className="text-gray-500">Qty {product.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-6">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Products Cost</p>
            <p>₹{productsCost}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Tax</p>
            <p>₹{tax}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Shipping Cost</p>
            <p>₹{shippingCost}</p>
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
            <button
              className="flex  items-center justify-center rounded-md border border-transparent bg-gray-900  py-1.5
            px-4 text-base font-medium text-white shadow-sm hover:bg-gray-800"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
