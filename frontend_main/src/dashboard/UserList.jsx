import React, { useState } from 'react'
import UserCard from './UserCard'
import { FaSearch } from "react-icons/fa";

const UserList = ({users, profileId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full">
      <div className='flex flex-row justify-center items-center'>
      <FaSearch className='text-3xl text-blue-500 hover:text-blue-600'/>
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="mx-4 p-6 border focus:border-green-400 rounded"
        />
      </div>
      {filteredUsers.map((user) => (
        user.id != profileId && <UserCard key={user.id} user={user}/>
      ))}
    </div>
  )
}

export default UserList
