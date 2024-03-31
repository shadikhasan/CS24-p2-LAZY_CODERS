import React from 'react'
import { useNavigate } from 'react-router-dom';

const NavbarDashboard = ({username, onCCClick}) => {
  const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center w-full h-16 bg-green-800 px-4 shadow-lg">
          <div>
          <button
              onClick={() => navigate('/profile')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg"
            >
              Profile
            </button>
          </div>
          <div className="flex flex-row justify-between items-center pr-8">
            <p className="text-white text-lg font-bold pl-3 font-mono pr-2">
              {username}
            </p>
            <button
              onClick={onCCClick}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      );
}

export default NavbarDashboard
