import { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import {
  ExclamationCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  resetProductState,
  updatedProduct,
} from "../../redux/actions";
import toast, { Toaster } from "react-hot-toast";

export default function AddProduct() {
  const products = useSelector((state) => state.products.products);
  const success = useSelector((state) => state.products.success);
  const [openModal, setOpenModal] = useState(undefined);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const [editProduct, setEditProduct] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: null,
    category: "",
    image: "",
  });
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetProductState());
    }
  }, [success, dispatch]);
  const handleOpenModal = (id) => {
    setOpenModal("pop-up");
    setProductId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(undefined);
  };
  const handleDeleteProduct = () => {
    console.log("click");
    dispatch(deleteProduct(productId));
    setOpenModal(undefined);
  };
  const handleEditForm = (product) => {
    setEditProduct(product);
    setOpenModal("form-elements");
  };
  const handleUpdate = (id, product) => {
    dispatch(updatedProduct(id, product));
    setOpenModal(undefined);
  };
  const hanldeSearchQuery = (e) => {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setFilterProducts([]);
      setSearchQuery("");
      return;
    }
    setSearchQuery(query);
    const filter = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setFilterProducts(filter);
  };

  const hanldeAddProduct = () => {
    if (!newProduct.name) {
      toast.error("Product Name field cannot be empty");
      return;
    }
    if (!newProduct.price) {
      toast.error("Price field cannot be empty");
      return;
    }
    if (!newProduct.category) {
      toast.error("Category Field Cannot Be Empty");
      return;
    }
    if (!newProduct.image) {
      toast.error("Image Field Cannot Be Empty");
      return;
    }
    dispatch(addProduct(newProduct));
    setOpenModal(undefined);
  };

  console.log(filterProducts);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="container flex flex-wrap lg:px-48 md:px-8 md:flex-col sm:flex-col mt-16 mb-8 sm:px-4 max-sm:px-2 pb-24">
        <div
          className="flex justify-between align-middle flex-wrap gap-10 max-sm:gap-2 max-sm:justify-center"
          style={{ alignItems: "center" }}
        >
          <h3 className="font-semibold text-xl mt-2">Your Products</h3>
          <input
            type="text"
            className="py-1  px-2 outline-none rounded text-gray-500 text-sm border focus:border-none"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => hanldeSearchQuery(e)}
          />
          <Button
            color="dark"
            className=" py-0 px-1 text-sm text-white rounded-md flex hover:bg-green-500"
            style={{ alignItems: "center" }}
            onClick={() => setOpenModal("add-product")}
          >
            Add Product
            <FolderPlusIcon className="h-4 w-6" />
          </Button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
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
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {filterProducts.length
                ? filterProducts.map((product) => {
                    {
                      console.log(`result ${product.name}`);
                    }
                    return (
                      <>
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={product._id}
                        >
                          <td className="w-32 p-4">
                            <img src={product.image} alt="Apple Watch" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 dark:text-white">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 capitalize">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 dark:text-white">
                            ₹{product.price}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="text-red-600"
                              onClick={() => handleOpenModal(product._id)}
                            >
                              <TrashIcon className="h-6 w-6 mx-2" />
                            </button>
                          </td>
                          <td>
                            <button
                              className="text-blue-600"
                              onClick={() => handleEditForm(product)}
                            >
                              <PencilSquareIcon className="h-6 w-6 mx-6" />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
                : products.map((product) => {
                    return (
                      <>
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={product._id}
                        >
                          <td className="w-32 p-4">
                            <img src={product.image} alt="Apple Watch" />
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 dark:text-white">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 capitalize">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-500 dark:text-white">
                            ₹{product.price}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="text-red-600"
                              onClick={() => handleOpenModal(product._id)}
                            >
                              <TrashIcon className="h-6 w-6 mx-2" />
                            </button>
                          </td>
                          <td>
                            <button
                              className="text-blue-600"
                              onClick={() => handleEditForm(product)}
                            >
                              <PencilSquareIcon className="h-6 w-6 mx-6" />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={openModal === "pop-up"}
        size="md"
        popup
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteProduct}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={handleCloseModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* product add form  */}
      <Modal
        show={openModal === "form-elements"}
        size="md"
        popup
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              To Update Product Make Changes Here
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Product Name" />
              </div>
              <TextInput
                id="email"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Price" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Category" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Image" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={editProduct.image}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-gray-800 uppercase w-full"
                onClick={() => handleUpdate(editProduct._id, editProduct)}
              >
                Update Changes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModal === "add-product"}
        size="md"
        popup
        onClose={handleCloseModal}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              Add New Product to your website here
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Product Name" />
              </div>
              <TextInput
                id="email"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Price" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Category" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Image" />
              </div>
              <TextInput
                id="password"
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <Button
                className="bg-gray-800 uppercase w-full"
                onClick={hanldeAddProduct}
              >
                Add New Product
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
