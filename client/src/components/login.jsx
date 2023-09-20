import { Link, useNavigate } from "react-router-dom";
import { AcmeLogo } from "./AcmeLogo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../redux/actions";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Add name field for signup
    contactNumber: null, // Add contactNumber field for signup
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userError = user.error;
  useEffect(() => {
    if (userError !== null) {
      toast.success(userError);
      console.log("user error toast");
    }
  }, [userError]);
  const validateLogin = () => {
    const errors = {};
    if (!loginData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email.trim())) {
      errors.email = "Invalid email address";
    }
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0;
  };

  // Define validation function for the signup form
  const validateSignup = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Full Name is required";
      toast.error("Full Name is Required");
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
    if (!formData.contactNumber) {
      errors.contactNumber = "Contact Number is required";
      toast.error("Contact Number is required");
      return;
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Invalid contact number";
      toast.error("Invalid Contact Number");
      return;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      toast.error("Password is required");
      return;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      toast.error("Password must be at least 8 characters");
      return;
    }
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      dispatch(userLogin(loginData, navigate));
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      formData.contactNumber = `+91${formData.contactNumber}`;
      dispatch(userRegister(formData, navigate));
    }
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {showLogin ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
              <AcmeLogo />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Do not have an account?
              <a
                href="#"
                className="font-semibold leading-6 text-gray-900 hover:text-gray-800 mx-1 transition-all"
                onClick={() => setShowLogin(false)}
              >
                Sign Up
              </a>
            </p>
            <p className="mt-2 text-center font-medium">
              <Link to="/" className="text-gray-600 text-sm">
                Go to Home
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
              <AcmeLogo />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 outline-none focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <a
                href="#"
                className="font-semibold leading-6 text-gray-900 hover:text-gray-700 mx-1 transition-all"
                onClick={() => setShowLogin(true)}
              >
                Login Now
              </a>
            </p>
            <p className="mt-2 text-center font-medium">
              <Link to="/" className="text-gray-600 text-sm">
                Go to Home
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
