import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [sent, setSent] = useState(false);
  const [tokenEndpint, setTokenEndpoint] = useState("");

  const notify = () => toast.error("Email is not valid!");
  const notify_p = () =>
    toast.error("Password and Confirm Password are not matched!");
  const notify_email = () =>
    toast.success("Check Email At `http://localhost:3000/`");
  const notify_password = () =>
    toast.success("Password Has Been Changed Successfully!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/send-reset-password-email/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (!data.errors) {
        notify_email();
        setSent(() => true);
      } else {
        notify();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmitForChangePassword = async (e) => {
    e.preventDefault();
    if (password != password2) {
      notify_p();
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/reset-password${tokenEndpint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();

      if (!data.errors) {
        notify_password();
        navigate("/auth/login");
      } else {
        notify();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      {!sent ? (
        <div className="flex justify-center items-center w-full h-full">
          <div className=" bg-gray-200 rounded-lg shadow-lg w-3/4 sm:w-5/6 md:w-2/4 lg:w-1/3 px-8 py-6">
            <h2 className="text-center text-green-800 text-2xl font-bold mb-4 uppercase">
              Your Email
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-green-600 transition duration-300"
              >
                Submit Email
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div className=" bg-gray-200 rounded-lg shadow-lg w-3/4 sm:w-5/6 md:w-2/4 lg:w-1/3 px-8 py-6">
            <h2 className="text-center text-green-800 text-2xl font-bold mb-4 uppercase">
              Your Password
            </h2>
            <form
              onSubmit={handleSubmitForChangePassword}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                placeholder="/eid/token-hijibiji/"
                value={tokenEndpint}
                onChange={(e) => setTokenEndpoint(e.target.value)}
                className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-green-600 transition duration-300"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
