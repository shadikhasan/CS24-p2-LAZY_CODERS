import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex justify-between items-center w-full h-16 bg-green-800 px-4 shadow-lg">
      <div>
        <p className="text-white text-xl font-bold pl-3 font-mono">EcoSync</p>
      </div>
      <div className="pr-8">
      {
        location.pathname !='/auth/login' && <>
          <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 mr-4 rounded-lg"
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 mr-4 rounded-lg"
        >
          Profile
        </button>
        </>
      }
      </div>
    </div>
  );
};

export default Navbar;
