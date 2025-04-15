import React, { useContext } from "react";
import axios from "axios";
import URL from "../../config";
import { StoreContext } from "../Context/Store";

function Card({ name, image }) {
  const {fetchCategoryData}=useContext(StoreContext)
  return (
    <div className="flex items-center justify-center">
      <div className="w-72 h-80 bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-xl  font-medium text-gray-800">{name}</h3>
          <button
            onClick={() => fetchCategoryData(name)}
            className="mt-3 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-lg transition"
          >
            Check Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
