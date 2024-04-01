import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCard = ({ user , onChangeUsers, users }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/users/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) {
          console.log("User deleted successfully");
          toast.success("User deleted successfully");
          onChangeUsers(users.filter(user => user.id !== id));
          navigate("/users");
        } else {
          toast.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    } else {
      return;
    }
  };
  const handleEdit = (user) => {
    navigate(`/users/${user.id}`);
  };

  return (
    <>
      <div className="px-4 pb-6 pt-0 rounded shadow m-7 flex bg-green-100">
        <div className="flex-none w-24 h-full p-2">
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="uppercase font-semibold">ID</span>
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="uppercase font-semibold">Username</span>
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="uppercase font-semibold">Name</span>
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="uppercase font-semibold">Email</span>
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="uppercase font-semibold">Role</span>
          </p>
        </div>

        <div className="grow p-2">
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="pr-2">:</span>
            {user.id}
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="pr-2">:</span>
            {user.username}
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="pr-2">:</span>
            {`${user.first_name} ${user.last_name}`}
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="pr-2">:</span>
            {user.email}
          </p>
          <p className="text-gray-600 w-full h-6 pb-1 pl-1">
            <span className="pr-2">:</span>
            {user.role_name}
          </p>
        </div>

        <div className="flex-col w-24 p-3 h-auto justify-between items-center">
          <div className="w-full h-full flex flex-col justify-between items-center">
            <button
              className="pb-2 pt-3 text-3xl hover:text-red-400"
              onClick={() => handleDelete(user.id)}
            >
              <MdDelete className="text-red-400 font-bold hover:text-red-700 hover:text-4xl" />
            </button>
            <button
              className="pb-2 pt-3 text-3xl"
              onClick={() => handleEdit(user)}
            >
              <BiEditAlt className="text-blue-400 font-bold hover:text-blue-700 hover:text-4xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
