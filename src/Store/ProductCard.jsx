import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/Store";

function ProductCard({ name, image, id }) {
  const { addtocart } = useContext(StoreContext);

  return (
    <div className="flex items-center justify-center">
      <div className="relative p-4 w-80 h-80 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
         
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="w-full h-40 object-cover" />
        </Link>

        
        <div className="my-5 text-center">
          <h3 className="text-lg font-medium text-gray-800">{name}</h3>
          
          
          <button
            onClick={() => addtocart(id)}
            className="absolute bottom-4 right-4 bg-green-400 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
