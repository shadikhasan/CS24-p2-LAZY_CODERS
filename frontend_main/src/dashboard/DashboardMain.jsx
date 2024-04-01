import React, { useEffect, useState } from "react";
import { FaTrash, FaTruck, FaUsers } from "react-icons/fa";
import axios from "axios";
// import { Chart as ChartJS} from "chart.js";
import Chart from 'chart.js/auto';
import { Bar, Doughnut, Line } from "react-chartjs-2";

const DashboardMain = () => {
  const [totalTrashCollected, setTotalTrashCollected] = useState(0);
  const [last7DaysTotalTrashCollected, setLast7DaysTotalTrashCollected] = useState(0);
  const [total_vehicles, setTotal_vehicles] = useState(0);
  const [total_waste_capacity, setTotal_waste_capacity] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersByRoleWithPercentage, setUsersByRoleWithPercentage] = useState([]);
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [chartInitialized, setChartInitialized] = useState(false); // New state variable

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

        // Extracting last 7 days data for chart
        console.log(last7DaysDumpingRecordsData)
        const last7DaysChartData = last7DaysDumpingRecordsData.map((record) => ({
          date: record.date,
          wasteCollected: parseFloat(record.VolumeOfWaste),
        }));
        setLast7DaysData(last7DaysDumpingRecordsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Cleanup function to destroy chart instance
  useEffect(() => {
    return () => {
      setChartInitialized(false); // Reset chart initialization state
    };
  }, []);

  // Chart data
  const chartData = {
    labels: last7DaysData.map((data) => data.date),
    datasets: [
      {
        label: "Waste Collected (Tons)",
        data: last7DaysData.map((data) => data.wasteCollected),
        fill: false,
        borderColor: "#FF5733",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full w-full bg-green-300 text-xl">

      <div className="flex flex-row justify-between items-center mx-8 mt-8">

        <div className="rounded-lg bg-white p-4 w-80">
          <p className="text-red-500">Total Trash Collected</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{totalTrashCollected}</span>
            <span className="text-sm">Tons</span>
            <FaTrash className="text-red-500 ml-auto text-xl" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 w-80">
          <p className="text-red-500">Total Waste Capacity</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{total_waste_capacity}</span>
            <span className="text-sm">Tons</span>
            <FaTrash className="text-red-500 ml-auto text-xl" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 w-80">
          <p className="text-red-500">Trash Collected In Last 7 Days</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{last7DaysTotalTrashCollected}</span>
            <span className="text-sm">Tons</span>
            <FaTrash className="text-red-500 ml-auto text-xl" />
          </div>
        </div>

      </div>


      <div className="flex flex-row justify-between m-8 gap-8">

        <div className="flex flex-col gap-4">

          <div className="bg-white p-4 rounded-lg">
            <div className=" text-red-500">
              <FaTruck className="mr-2" />
              <p>Total Trucks</p>
            </div>
            <div className="text-xl font-bold">{total_vehicles}</div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="text-red-500">
              <FaUsers className="mr-2" />
              <p>Total Users </p>
            </div>
            <div className="text-xl font-bold">{totalUsers}</div>
          </div>

        </div>

        <div className="bg-white p-4 rounded-xl flex-1">
          <div className="flex justify-center items-center text-red-500">
            <FaUsers className="mr-2" />
            <p>Total Users Percentages</p>
          </div>
          <div className="text-xl font-bold flex justify-center items-center">{totalUsers} types of users</div>
          <div className="mt-2">
            <p className="text-red-500 flex justify-center items-center pb-3">Users by Role</p>
            <div className="flex flex-row justify-between items-center">
              {usersByRoleWithPercentage.map((user, index) => (
                <div key={index} className="flex flex-row items-center mt-2 p-2 rounded-md hover:shadow-md">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-lf font-bold">{user.role__Name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-lg">{user.role__Name}</p>
                    <p className="text-sm">{user.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-8">
        <p className="text-red-500 text-md">Waste Collected in Last 7 Days</p>
        <div className="bg-white p-8 rounded-xl mt-4">
          <div className="p-4">
            <Bar
              data={{
                labels: ["Today", "1d ago", "2d ago", "3d ago", "4d ago", "5d ago", "6d ago"],
                datasets: [
                  {
                    label: "Total Waste",
                    data: last7DaysData.map((d) => d.VolumeOfWaste)
                  }
                ]
              }}
            />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
