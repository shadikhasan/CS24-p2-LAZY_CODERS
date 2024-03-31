import React, { useState } from "react";
import UserCard from "./UserCard";
import { FaSearch } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const UserList = ({ users, profileId, onChangeUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full">
      <div className="flex flex-row justify-center items-center pt-2">
        <FaSearch className="text-3xl text-blue-400 hover:text-blue-700" />
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-4 p-6 border  w-1/3 focus:border-green-400 rounded"
        />
        <button onClick={() => navigate("/auth/create")}>
          <TiUserAdd className="text-3xl text-blue-400 hover:text-blue-700" />
        </button>
      </div>
      {filteredUsers.map(
        (user) =>
          user.id != profileId && (
            <UserCard key={user.id} user={user} onChangeUsers={onChangeUsers} users={users} />
          )
      )}
    </div>
  );
};

export default UserList;
