import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileNavbar from "./ProfileNavbar";
import ChangePassword from "./ChangePassword";
import ChangeProfile from "./ChangeProfile";

const Description = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-center text-black">Welcome to</p>
      <p className="text-center text-black font-bold">
        Waste Wanagement Ecosystem
      </p>
      <p className="text-center font-bold text-green-800 text-lg">EcoSync</p>
      <button
        className="bg-green-500 m-3 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg"
        onClick={() => navigate('/dashboard')}
      >
        Dashboard
      </button>
    </div>
  );
};

const Profile = () => {
  function calculateTimeDifference(created_at) {
    const createdAtDate = new Date(created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAtDate;
    const days = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    return { days, hours, minutes };
  }

  const notify_logout_success = () => toast.success("Logged Out Successfully ");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [rolename, setRolename] = useState("");
  const [created_at, setCreated_at] = useState({});
  const [isChanging, setIsChanging] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  async function populateProfile() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data[0];
      setEmail(() => data.email);
      setFirstname(() => data.first_name);
      setLastname(() => data.last_name);
      setUsername(() => data.username);
      setRolename(() => data.role_name);
      setCreated_at(() => calculateTimeDifference(data.created_at));
      setUid(() => data.id);
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/auth/login");
      console.log(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      } else {
        populateProfile();
      }
    } else {
      navigate("/auth/login");
    }
  }, [isProfile]);

  const handleClick = (e) => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    notify_logout_success();
  };

  const changeit = () => {
    setIsChanging(() => !isChanging);
  };
  const profileit = () => {
    setIsProfile(() => !isProfile);
  };

  const __password_change_success = () =>
    toast.success("Change of password is successfull!");

  return (
    <div className="w-full h-screen">
      <ProfileNavbar username={username} onClick={handleClick} />
      <div className="w-full h-full flex flex-row">
        {!isChanging && !isProfile && <Description />}
        {isChanging && <ChangePassword changeState={changeit} />}
        {isProfile && <ChangeProfile changeState={profileit} />}
        {!isChanging && !isProfile && (
          <div className="bg-green-100 shadow-sm w-full h-full p-8">
            <div className="mb-8">
              <p className="font-bold text-xl mb-2">Profile Details</p>
              <div className="border-b border-gray-400 w-full"></div>
            </div>
            <p className="mb-2">
              <span className="font-bold">User Id :</span> {uid}
            </p>
            <p className="mb-2">
              <span className="font-bold">First Name :</span> {firstname}
            </p>
            <p className="mb-2">
              <span className="font-bold">Last Name :</span> {lastname}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email :</span> {email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Role :</span> {rolename}
            </p>
            <p className="mb-4">
              <span className="font-bold">Account Created :</span>
              {created_at.days ? ` ${created_at.days} days ` : " "}
              {created_at.hours ? `${created_at.hours} hours ` : ""}
              {created_at.minutes} minutes ago
            </p>
            <button
              className="bg-green-500 m-2 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg"
              onClick={() => setIsChanging(() => !isChanging)}
            >
              Change Password
            </button>
            <button
              className="bg-green-500 m-2 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-lg"
              onClick={() => setIsProfile(() => !isProfile)}
            >
              Change Profile
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
