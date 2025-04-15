import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import URL from "../../config";
import { StoreContext } from "../Context/Store";



function Users() {
  const [users, setUsers] = useState([]);
  const {token}=useContext(StoreContext)


  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/users/`,
        {
          headers:{ Authorization : `Bearer ${token}`}
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser= async (pk)=>{
    const response= await axios.delete(`${URL}users/${pk}`)
    fetchUsers();
  }
  

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex justify-center p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Users List</h1>
        {users.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Username
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Role
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Last Login
                  </th>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-1 text-sm text-gray-700">{user.id}</td>
                    <td className="px-5 py-1 text-sm text-gray-700">
                      {user.username}
                    </td>
                    <td className="px-5 py-1 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-5 py-1 text-sm text-gray-700">
                      {user.is_staff ? "Admin" : "User"}
                    </td>
                    <td className="px-5 py-1 text-sm text-gray-700">
                      {new Date(user.last_login).toLocaleString()}
                    </td>
                    <td className="  p-1 text-sm text-gray-700 flex gap-3 ">
                      <button  onClick={()=>deleteUser(user.id)} className="py-2 px-2 bg-red-100 flex justify-center  rounded-lg hover:bg-red-500 hover:text-black ">Delete User</button>
                      <button  onClick={()=>deleteUser(user.id)} className="py-2 px-2 bg-green-100 flex justify-center  rounded-lg hover:bg-green-500 hover:text-black ">Edit User</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;