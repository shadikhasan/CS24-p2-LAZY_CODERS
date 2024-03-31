import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ changeState }) => {
  const navigate = useNavigate();

  const notMatched = () =>
    toast.error("Old papssword is wrong or you have set the password exactly same as before");

  const [old_password, setPassword] = useState("");
  const [new_password, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/change-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ old_password, new_password }),
        }
      );
      const data = await response.json();
      if (!data.errors) {
        changeState();
        toast.success("Password hab been changed successfully!")
      } else {
        notMatched();
      }
    } catch (error) {
      console.log(error.message);
    }
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
            placeholder="Old Password"
            value={old_password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={new_password}
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
