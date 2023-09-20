import { useState } from "react";
import { AcmeLogo } from "../AcmeLogo";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adminLoginAC } from "../../redux/actions";
export default function AdminLogin() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.username) {
      toast.error("Username is required");
      return;
    }
    if (!loginData.password) {
      toast.error("Password is required");
      return;
    }
    const username = loginData.username;
    const password = loginData.password;
    dispatch(adminLoginAC({ username, password }, naviagate));
  };
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <AcmeLogo />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to access Dashboard
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
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
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-2 text-center font-medium">
            <Link to="/" className="text-gray-600 text-sm">
              Go to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
