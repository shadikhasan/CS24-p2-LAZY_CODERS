// import React, { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { FaTruck } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
// import axios from "axios";

// const DashboardMain = () => {
//   // const __totalTrashCollected = [
//   //   {
//   //     EntryID: 1,
//   //     VolumeOfWaste: "100.00",
//   //     TimeOfArrival: "2024-03-29T13:43:00Z",
//   //     TimeOfDeparture: "2024-03-29T13:43:02Z",
//   //     CreatedAt: "2024-03-29T13:43:07.831450Z",
//   //     UpdatedAt: "2024-03-29T13:43:07.831450Z",
//   //     Vehicle: 1,
//   //     Landfill: 1,
//   //   },
//   //   {
//   //     EntryID: 2,
//   //     VolumeOfWaste: "500.00",
//   //     TimeOfArrival: "2024-03-30T19:42:35Z",
//   //     TimeOfDeparture: "2024-03-30T19:42:37Z",
//   //     CreatedAt: "2024-03-30T19:42:38.170370Z",
//   //     UpdatedAt: "2024-03-30T19:42:38.170370Z",
//   //     Vehicle: 2,
//   //     Landfill: 1,
//   //   },
//   // ];
//   const [totalTrashCollected, setTotalTrashCollected] = useState(0)
//   // const totalWaste = __totalTrashCollected.reduce(
//   //   (sum, record) => sum + parseFloat(record.VolumeOfWaste),
//   //   0
//   // );
//     // USESTATES
  

//   // const __last7DaysTotalTrashCollected = [
//   //   {
//   //     EntryID: 1,
//   //     VolumeOfWaste: "700.00",
//   //     TimeOfArrival: "2024-03-29T13:43:00Z",
//   //     TimeOfDeparture: "2024-03-29T13:43:02Z",
//   //     CreatedAt: "2024-03-29T13:43:07.831450Z",
//   //     UpdatedAt: "2024-03-29T13:43:07.831450Z",
//   //     Vehicle: 1,
//   //     Landfill: 1,
//   //   },
//   //   {
//   //     EntryID: 2,
//   //     VolumeOfWaste: "3500.00",
//   //     TimeOfArrival: "2024-03-30T19:42:35Z",
//   //     TimeOfDeparture: "2024-03-30T19:42:37Z",
//   //     CreatedAt: "2024-03-30T19:42:38.170370Z",
//   //     UpdatedAt: "2024-03-30T19:42:38.170370Z",
//   //     Vehicle: 2,
//   //     Landfill: 1,
//   //   },
//   // ];
//   // const totalWaste7Days = __last7DaysTotalTrashCollected.reduce(
//   //   (sum, record) => sum + parseFloat(record.VolumeOfWaste),
//   //   0
//   // );
//   const [last7DaysTotalTrashCollected, setLast7DaysTotalTrashCollected] = useState(0)

//   // const __total_vehicles = {
//   //   total_vehicles: 2,
//   //   vehicles_by_type: [
//   //     {
//   //       Type: "Open Truck",
//   //       count: 2,
//   //     },
//   //   ],
//   //   total_fuel_cost_loaded: 1300.0,
//   //   total_fuel_cost_unloaded: 900.0,
//   //   average_fuel_cost_loaded: 650.0,
//   //   average_fuel_cost_unloaded: 450.0,
//   // };
//   const [total_vehicles, setTotal_vehicles] = useState(0);

//   // const __total_waste_capacity = {
//   //   total_waste_capacity: 400.0,
//   // };
//   const [total_waste_capacity, setTotal_waste_capacity] = useState(0)

//   // const total_users = {
//   //   total_users: 15,
//   //   users_by_role: [
//   //     {
//   //       role__Name: "System Admin",
//   //       count: 1,
//   //     },
//   //     {
//   //       role__Name: "LandFiled Manager",
//   //       count: 5,
//   //     },
//   //     {
//   //       role__Name: "STS Manager",
//   //       count: 2,
//   //     },
//   //     {
//   //       role__Name: "System Admin",
//   //       count: 2,
//   //     },
//   //     {
//   //       role__Name: "Unassigned",
//   //       count: 3,
//   //     },
//   //   ],
//   // };

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [allTotalUsers, setAllTotalUsers] = useState([]);
  

//   const usersByRoleWithPercentage = allTotalUsers.map((user) => ({
//     ...user,
//     percentage: ((user.count / totalUsers) * 100).toFixed(2),
//   }));
  

//   useEffect(() => {
//     //
//     const f_totalTrashCollected = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/total-dumping-records/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if(response) {
//           const data = response.data;
//           const  x = data.reduce(
//             (sum, record) => sum + parseFloat(record.VolumeOfWaste),
//             0
//           );
//           setTotalTrashCollected(x);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     f_totalTrashCollected();
//     // 
//     const f_last7DaysTotalTrashCollected = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/last-7-days-dumping-records/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if(response) {
//           const data = response.data;
//           const  x = data.reduce(
//             (sum, record) => sum + parseFloat(record.VolumeOfWaste),
//             0
//           );
//           setLast7DaysTotalTrashCollected(x);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     f_last7DaysTotalTrashCollected();
//     //
//     const f_total_vehicles = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/vehicle-summary/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if(response) {
//           const data = response.data.total_vehicles;
//           setTotal_vehicles(data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     f_total_vehicles();
//     //
//     const f_calacity = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/landfill-waste-capacity/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if(response) {
//           const data = response.data.total_waste_capacity;
//           setTotal_waste_capacity(data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     f_calacity();
//     //
//     const f_total_user = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8000/user-summary/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if(response) {
//           const data = response.data.total_users;
//           const arr = response.data.users_by_role;
//           setTotalUsers(data);
//           setAllTotalUsers(arr);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     f_total_user();
//   }, [])

//   return (
//     <div className="flex flex-col bg-green-300 h-screen text-xl">
//       <div className="flex flex-row justify-between items-center ml-28  mt-8 text-xl">
//         <div className="rounded-lg bg-white p-4 w-80 h-full">
//           <p className="text-red-500">Total Trash Collected</p>
//           <div className="flex flex-row ">
//             <span className="text-xl font-bold">{totalWaste}</span>
//             <p className="pl-2">Tons</p>
//             <div className="pl-32">
//               <FaTrash className="text-red-500 m-2 text-xl" />
//             </div>
//           </div>
//         </div>
//         <div className="rounded-lg bg-white p-4 w-80 h-full mr-28">
//           <p className="text-red-500">Trash Collected In 7 Days</p>
//           <div className="flex flex-row ">
//             <span className="text-xl font-bold">{totalWaste7Days}</span>
//             <p className="pl-2">Tons</p>
//             <div className="pl-32">
//               <FaTrash className="text-red-500 m-2 text-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-row m-28 gap-8 justify-center text-xl">
//         <div className="flex flex-col gap-8">
//           <div className="bg-white p-4 rounded-lg w-80">
//             <div className="flex flex-row text-red-500">
//               <p className="pr-8">Total Trucks</p> <FaTruck />
//             </div>
//             <div className="text-xl font-bold flex justify-center">
//               {total_vehicles.total_vehicles}
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-lg">
//             <div className="text-red-500">
//               <p>Waste Capacity</p>
//             </div>
//             <div className="text-xl font-bold">
//               {total_waste_capacity.total_waste_capacity} Ton
//             </div>
//           </div>
//         </div>
//         <div className="bg-white rounded-xl p-4 text-xl">
//           <div className="flex flex-row text-red-500 m-2 text-xl ">
//             <FaUsers />
//             <h1 className="pl-2">Total Users</h1>
//           </div>
//           <div className="text-xl font-bold ml-10 p-2">
//             {total_users.total_users}
//           </div>
//           <div className="flex flex-row text-xl">
//             <div className="pl-12 ">
//               <div className="bg-red-200 p-1 mb-2">System Admin</div>
//               <div className="bg-amber-300 p-1 mb-2">Landfill Manager</div>
//               <div className="bg-green-200 p-1 mb-2">STS Manager</div>
//               <div className="bg-light_blue-200 p-1 mb-2">Unassigned</div>
//             </div>
//             <div className="flex flex-col text-xl  w-100">
//               {usersByRoleWithPercentage.map((user) => (
//                 <div className="flex items-center mb-2" key={user.EntryID}>
//                   <div className="ml-1 pl-4">{`${user.role__Name} (${user.percentage}%)`}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default DashboardMain;

import React from 'react'

const MainDashboardMain = () => {
  return (
    <div>
      
    </div>
  )
}

export default MainDashboardMain

