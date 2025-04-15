import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import URL from "../../config";
import { StoreContext } from "../Context/Store";

export default function Orders() {
  const {orderproducts}=useContext(StoreContext)

  console.log(orderproducts);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex justify-center p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Ordered Products</h1>
        
        {orderproducts.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border-b-2">Product</th>
                  <th className="p-4 border-b-2">Image</th>
                  <th className="p-4 border-b-2">Price</th>
                  <th className="p-4 border-b-2">Quantity</th>
                  <th className="p-4 border-b-2">Subtotal</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {orderproducts.map((product,index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{product.product_name}</td>
                    <td className="p-4 border-b">
                      <img
                          
                        alt={product.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 border-b">${product.product_price}</td>
                    <td className="p-4 border-b">{product.quantity}</td>
                    <td className="p-4 border-b">${product.item_subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">No ordered products found.</p>
            <p className="text-gray-500 mt-2">
              Start shopping to see your ordered products here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
