import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UseDetails = () => {
  const extractId = (str) => {
    const regex = /\/users\/(\d+)/
    const match = regex.exec(str);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
  const navigate = useNavigate();
  const location = useLocation();
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const alreadyExist = () => toast.error("Email already exist");
  const notify_successfull_login = () => toast.success("Successfull!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
        }),
      });
      const data = await response.json();
      if (!data.errors) {
        navigate("/uses");
        notify_successfull_login();
      } else {
        alreadyExist();
      }
    } catch (errors) {
      alreadyExist();
      console.log(errors.message);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <div className=" bg-gray-200 rounded-lg shadow-lg w-3/4 sm:w-5/6 md:w-2/4 lg:w-1/3 px-8 py-6">
          <h2 className="text-center text-green-800 text-2xl font-bold mb-4 uppercase">
            User Id {extractId(location.pathname)}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              placeholder="Firstname"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full h-12 bg-white border border-gray-300 rounded-md px-4 mb-4 focus:outline-none focus:border-green-500"
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
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
                onClick={() => navigate("/users")}
                className="font-semibold text-green-500 focus:outline-none hover:text-green-700 transition duration-300"
              >
                Back to Users
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UseDetails;
