import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";

const Sidebar = ({ onSelectOption, manager}) => {

  const navigate = useNavigate();
  const preStype = 1;
  const postStype = 2;

  const [style_dash, setStyle_dash] = useState(postStype);
  const [style_ul, setStyle_ul] = useState(preStype);
  const [style_admin, setStyle_admin] = useState(preStype);
  const [style_onno, setStyle_onno] = useState(preStype);

  const handleOptionClick = (option) => {
    onSelectOption(option);

    setStyle_dash(preStype);
    setStyle_admin(preStype);
    setStyle_onno(preStype);
    setStyle_ul(preStype);

    if (option === "Dashboard") {
      setStyle_dash(postStype);
      navigate('/dashboard')
    }
    else if (option === "UserList") {
      setStyle_ul(postStype);
      navigate('/users')
    }
    else if (option === "Admin") {
      setStyle_admin(postStype);
    } else {
      navigate('/auth/create')
      setStyle_onno(postStype);
    }
  };

  return (
    <div className="h-auto bg-green-100 text-white w-1/5 flex-none">
      <h2 className="w-full text-3xl font-bold font-mono text-green-950 pb-4 pt-2 border-b-2 border-white flex justify-center items-center shadow-lg">
        EcoSync
      </h2>
      <div className="p-6 w-full">
        <ul className="mt-6 w-full">
           <li className="mb-4 w-full">
            <button
              onClick={() => handleOptionClick('Dashboard')}
              className={style_dash === preStype ? 'w-full text-lg text-gray-800 hover:text-green-900 hover:font-bold hover:text-2xl hover:border-b-2' : 'w-full text-green-900 font-bold text-2xl border-b-2'}
            >
              <span className="flex flex-row justify-center items-center h-full w-full"><RxDashboard className="pr-1"/> Dashboard</span>
            </button>
          </li>
          { manager==='System Admin' && <li className="mb-4 w-full">
            <button
              onClick={() => handleOptionClick('UserList')}
              className={style_ul === preStype ? 'w-full text-lg text-gray-800 hover:text-green-900 hover:font-bold hover:text-2xl hover:border-b-2' : 'w-full text-green-900 font-bold text-2xl border-b-2'}
            >
              <span className="flex flex-row justify-center items-center h-full w-full"><FaUsers className="pr-1"/> User List</span>
            </button>
          </li>}
          <li className="mb-4 w-full">
            <button
              onClick={() => handleOptionClick("Admin")}
              className={style_admin === preStype ? 'w-full text-lg text-gray-800 hover:text-green-900 hover:font-bold hover:text-2xl hover:border-b-2' : 'w-full text-green-900 font-bold text-2xl border-b-2'}
            >
              <span className="flex flex-row justify-center items-center h-full w-full"><GrUserAdmin className="pr-1"/> <a href="http://127.0.0.1:8000/admin/">Admin Panel</a></span>
            </button>
          </li>
          {
            manager==='System Admin' && <li className="mb-4 w-full">
            <button
              onClick={() => handleOptionClick("Profile")}
              className={style_onno === preStype ? 'w-full text-lg text-gray-800 hover:text-green-900 hover:font-bold hover:text-2xl hover:border-b-2' : 'w-full text-green-900 font-bold text-2xl border-b-2'}
            >
              <span className="flex flex-row justify-center items-center h-full w-full"><IoPersonAdd className="pr-1"/> Create User</span>
            </button>
          </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
