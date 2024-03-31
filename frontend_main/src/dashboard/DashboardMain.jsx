import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import axios from "axios";

const DashboardMain = () => {
  const [totalTrashCollected, setTotalTrashCollected] = useState(0);
  const [last7DaysTotalTrashCollected, setLast7DaysTotalTrashCollected] = useState(0);
  const [total_vehicles, setTotal_vehicles] = useState(0);
  const [total_waste_capacity, setTotal_waste_capacity] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersByRoleWithPercentage, setUsersByRoleWithPercentage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalDumpingRecords, last7DaysDumpingRecords, vehicleSummary, landfillWasteCapacity, userSummary] = await Promise.all([
          axios.get("http://127.0.0.1:8000/total-dumping-records/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/last-7-days-dumping-records/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/vehicle-summary/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/landfill-waste-capacity/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/user-summary/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const totalDumpingRecordsData = totalDumpingRecords.data;
        const last7DaysDumpingRecordsData = last7DaysDumpingRecords.data;
        const vehicleSummaryData = vehicleSummary.data;
        const landfillWasteCapacityData = landfillWasteCapacity.data;
        const userSummaryData = userSummary.data;

        const totalTrashCollectedValue = totalDumpingRecordsData.reduce(
          (sum, record) => sum + parseFloat(record.VolumeOfWaste),
          0
        );
        setTotalTrashCollected(totalTrashCollectedValue);

        const last7DaysTotalTrashCollectedValue = last7DaysDumpingRecordsData.reduce(
          (sum, record) => sum + parseFloat(record.VolumeOfWaste),
          0
        );
        setLast7DaysTotalTrashCollected(last7DaysTotalTrashCollectedValue);

        setTotal_vehicles(vehicleSummaryData.total_vehicles);
        setTotal_waste_capacity(landfillWasteCapacityData.total_waste_capacity);

        const totalUsersValue = userSummaryData.total_users;
        const usersByRoleWithPercentageValue = userSummaryData.users_by_role.map((user) => ({
          ...user,
          percentage: ((user.count / totalUsersValue) * 100).toFixed(2),
        }));
        setTotalUsers(totalUsersValue);
        setUsersByRoleWithPercentage(usersByRoleWithPercentageValue);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-green-300 h-screen text-xl">
      <div className="flex flex-row justify-between items-center ml-28  mt-8 text-xl">
        <div className="rounded-lg bg-white p-4 w-80 h-full">
          <p className="text-red-500">Total Trash Collected</p>
          <div className="flex flex-row ">
            <span className="text-xl font-bold">{totalTrashCollected}</span>
            <p className="pl-2">Tons</p>
            <div className="pl-32">
              <FaTrash className="text-red-500 m-2 text-xl" />
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 w-80 h-full mr-28">
          <p className="text-red-500">Trash Collected In 7 Days</p>
          <div className="flex flex-row ">
            <span className="text-xl font-bold">{last7DaysTotalTrashCollected}</span>
            <p className="pl-2">Tons</p>
            <div className="pl-32">
              <FaTrash className="text-red-500 m-2 text-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row m-28 gap-8 justify-center text-xl">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-4 rounded-lg w-80">
            <div className="flex flex-row text-red-500">
              <p className="pr-8">Total Trucks</p> <FaTruck />
            </div>
            <div className="text-xl font-bold flex justify-center">
              {total_vehicles}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="text-red-500">
              <p>Waste Capacity</p>
            </div>
            <div className="text-xl font-bold">
              {total_waste_capacity} Ton
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 text-xl">
          <div className="flex flex-row text-red-500 m-2 text-xl ">
            <FaUsers />
            <h1 className="pl-2">Total Users</h1>
          </div>
          <div className="text-xl font-bold ml-10 p-2">
            {totalUsers}
          </div>
          <div className="flex flex-row text-xl">
            <div className="pl-12 ">
              <div className="bg-red-200 p-1 mb-2">System Admin</div>
              <div className="bg-amber-300 p-1 mb-2">Landfill Manager</div>
              <div className="bg-green-200 p-1 mb-2">STS Manager</div>
              <div className="bg-light_blue-200 p-1 mb-2">Unassigned</div>
            </div>
            <div className="flex flex-col text-xl  w-100">
              {usersByRoleWithPercentage.map((user, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <div className="ml-1 pl-4">{`${user.role__Name} (${user.percentage}%)`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
