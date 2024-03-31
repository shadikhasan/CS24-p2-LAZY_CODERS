import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast.error("Error in email or password ");
  const notify_successfull_login = () => toast.success("Log in successfull!")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (!data.errors) {
        notify_successfull_login();
        localStorage.setItem("token", data.token.access);
        navigate("/profile");
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
      <div className="flex justify-center items-center w-full h-full">
        <div className=" bg-gray-200 rounded-lg shadow-lg w-3/4 sm:w-5/6 md:w-2/4 lg:w-1/3 px-8 py-6">
          <h2 className="text-center text-green-800 text-2xl font-bold mb-4 uppercase">
            Log In
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Usename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-green-600 transition duration-300"
            >
              Log In
            </button>
          </form>
          <div className="mt-2 text-center">
            <p>
              <button
                onClick={() => navigate("/auth/reset-password")}
                className="font-semibold text-red-500 focus:outline-none hover:text-red-700 transition duration-300"
              >
                Forgot Password
              </button>
            </p>
          </div>
          <div className="mt-3 text-center">
            <p>
              Need an account?{" "}
              <button
                onClick={() => navigate("/auth/create")}
                className="font-semibold text-green-500 focus:outline-none hover:text-green-700 transition duration-300"
              >
                Create
              </button>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
