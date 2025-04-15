import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../config";
import { useContext } from "react";
import { StoreContext } from "../Context/Store";
function Dashboard() {
  const {orderproducts}=useContext(StoreContext) 

  const [dashboardData, setDashBoardData] = useState({
    orders_count: 0,
    product_count: 0,
    total_revenue: 0,
    user_count: 0,
    recent_orders: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${URL}/dashboard/`);
      setDashBoardData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className=" w-screen p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Orders Count Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">{dashboardData.orders_count}</p>
          <p className="text-sm mt-1 text-green-500">+5% from last month</p>
        </div>

        {/* Products Count */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-2xl font-bold mt-2">{dashboardData.product_count}</p>
          <p className="text-sm mt-1 text-green-500">+10% from last month</p>
        </div>

        {/* Revenue  */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">${dashboardData.total_revenue}</p>
          <p className="text-sm mt-1 text-green-500">+15% from last month</p>
        </div>

        {/* Users Count  */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{dashboardData.user_count}</p>
          <p className="text-sm mt-1 text-green-500">+8% from last month</p>
        </div>
      </div>

      {/* Recent Orders  */}
      {/* <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderproducts?.map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.product_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.item_subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;