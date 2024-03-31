import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ changeState }) => {
  const navigate = useNavigate();

  const notMatched = () =>
    toast.error("Password and Confirm Password did not match!");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != password2 || !password) {
      notMatched();
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/change-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ password, password2 }),
        }
      );
      const data = await response.json();
      if (!data.errors) {
        changeState();
        navigate("/profile");
        __password_change_success();
      } else {
        notMatched();
      }
    } catch (error) {
      console.log(error.message);
    }
    changeState();
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className=" bg-gray-200 rounded-lg shadow-lg w-3/4 sm:w-5/6 md:w-2/4 lg:w-1/3 px-8 py-6">
        <h2 className="text-center text-green-800 text-2xl font-bold mb-4 uppercase">
          Change Your Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            placeholder="password"
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
            Update
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            <button
              onClick={changeState}
              className="font-semibold text-green-500 focus:outline-none hover:text-green-700 transition duration-300"
            >
              Back to profile
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
