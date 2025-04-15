
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/Store";
import { decodeAndCorrectImageUrl } from "../utils/decodeAndCorrectImageUrl";


export default function Cart() {
  const {cart,updateQuantity, handleDelete}=useContext(StoreContext)


  return (
    <div className="w-screen bg-gray-100 min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product details section */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <h2 className="text-center text-gray-500 text-xl">Your cart is empty</h2>
          ) : (
            <div className="space-y-6">
              {cart.cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  {/* Image and name */}
                  <div className="flex items-center gap-4 w-60">
                    {
                      console.log(decodeAndCorrectImageUrl(item.product_image))
                      
                    }
                    <img
                      src={decodeAndCorrectImageUrl(item.product_image)}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="">
                      <h2 className="font-semibold  text-gray-800 w-70">
                        {item.product_name}
                      </h2>
                      <p className="text-gray-600">${item.product_price}</p>
                      <br />
                      <button
                      onClick={() => updateQuantity(item.product_id, "decrease")} 
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, "increase")}
                      className="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      +
                    </button>
                    </div>
                    
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 w-20 mx-6">
                    
                  </div>

                  {/* Total price and remove button */}
                  <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-lg text-gray-800 w-20">
                      ${item.product_price * item.quantity}
                    </h2>
                    <button onClick={()=>handleDelete(item.product_id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-30">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout section  */}
        {cart?.cartItems?.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-800">${cart.total_amount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-gray-800">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold text-gray-800">$0.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-gray-800">${cart.total_amount?.toFixed(2)}</span>
                  {console.log(cart)}
                </div>
              </div>
            </div>
            <Link to='/checkout'><button className="w-full bg-green-500 text-white px-6 py-3 rounded-lg mt-6 hover:bg-green-600 transition duration-300">
              Proceed to Checkout
            </button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
