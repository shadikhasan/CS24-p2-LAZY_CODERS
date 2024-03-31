import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full h-16 bg-green-800 px-4 shadow-lg">
      <div>
        <p className="text-white text-xl font-bold pl-3 font-mono">EcoSync</p>
      </div>
      <div className="pr-8">
        <button
          onClick={() => navigate("/auth/login")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-5 mr-4 rounded-lg"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/auth/create")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Navbar;
