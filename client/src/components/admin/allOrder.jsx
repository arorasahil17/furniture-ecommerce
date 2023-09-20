import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, resetOrderState, updateOrder } from "../../redux/actions";
import Loader from "../loader";
import { Modal, Label, Button } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

export default function AllOrders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  // const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(undefined);
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState(order.status);
  const isLoading = useSelector((state) => state.order.loading);
  const success = useSelector((state) => state.order.success);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetOrderState());
    }
    dispatch(getOrders());
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  }, [dispatch, success]);

  const handleOpenModal = (order) => {
    setOpenModal("form-elements");
    setOrder(order);
    console.log(order);
    setOrderId(order._id);
  };

  const handleCloseModal = () => {
    setOpenModal(undefined);
  };

  const handleOrderChange = () => {
    if (order.status.toLowerCase() === "shipped" && orderStatus === "shipped") {
      toast.error("This order has already shipped");
      return;
    }
    dispatch(updateOrder(orderStatus, orderId));
    setOpenModal(undefined);
  };
  // const validateStatus=()=>{
  //   if(order.status==='shipped'){''}
  // }
  // validateStatus()
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container px-48 max-sm:px-4 pb-24">
          {orders.map((order) => {
            return (
              <>
                <div
                  className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-6"
                  key={order._id}
                >
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product) => {
                        return (
                          <>
                            <tr className="border-b">
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {product.name}
                              </th>
                              <td className="px-6 py-4">{product.quantity}</td>
                              <td className="px-6 py-4 capitalize">
                                {product.category}
                              </td>
                              <td className="px-6 py-4">₹{product.price}</td>
                            </tr>
                          </>
                        );
                      })}
                      <tr>
                        <td
                          colSpan="3"
                          className="px-6 py-4 font-medium text-gray-600"
                        >
                          Status
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-600">
                          {order.status.toLowerCase() === "pending" && (
                            <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 capitalize">
                              {order.status}
                            </span>
                          )}
                          {order.status.toLowerCase() === "shipped" && (
                            <span className="inline-flex items-center rounded-md bg-indigo-200 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 capitalize">
                              {order.status}
                            </span>
                          )}
                          {order.status.toLowerCase() === "delievered" && (
                            <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 capitalize">
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {order.status.toLowerCase() !== "delievered" && (
                            <button
                              className="font-medium text-blue-600 hover:underline"
                              onClick={() => handleOpenModal(order)}
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            );
          })}
        </div>
      )}
      <div className="">
        <Modal
          show={openModal === "form-elements"}
          size="md"
          popup
          onClose={handleCloseModal}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white text-center">
                Update Order Status
              </h3>
              <div className="status flex justify-center gap-6">
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="shipped"
                    checked={orderStatus === "shipped"}
                    onChange={() => setOrderStatus("shipped")}
                    className="me-2"
                  />
                  <Label
                    htmlFor="shipped"
                    className="text-md text-gray-500 font-semibold"
                  >
                    Shipped
                  </Label>
                </div>
                <div className="">
                  <input
                    type="radio"
                    name="status"
                    // value={orderStatus}
                    checked={orderStatus === "delievered"}
                    onChange={() => setOrderStatus("delievered")}
                    id="delievered"
                    className="me-2"
                  />
                  <Label
                    htmlFor="delievered"
                    className="text-md text-gray-500 font-semibold"
                  >
                    Delievered
                  </Label>
                </div>
              </div>
              <div className="w-full">
                <Button
                  className="bg-gray-800 uppercase w-full"
                  onClick={handleOrderChange}
                >
                  Update Changes
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
