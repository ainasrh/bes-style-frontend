import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import URL from "../../config";
import { StoreContext } from "../Context/Store";
import { decodeAndCorrectImageUrl } from "../utils/decodeAndCorrectImageUrl";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const { token, addtocart } = useContext(StoreContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${URL}/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${URL}/wishlist/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWishlist();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const addToCartAndRemove=(productId)=>{
    addtocart(productId)
    removeFromWishlist(productId)
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">My Wishlist</h2>
          {/* {wishlist.length > 0 && (
            <button
            //   onClick={addAllToCart}
              className="px-5 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
            >
              Add All to Cart
            </button>
          )} */}
        </div>

        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">No items in wishlist.</p>
        ) : (
          <ul className="bg-white rounded-lg overflow-hidden border border-gray-200">
            {wishlist.map((item, index) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={(decodeAndCorrectImageUrl(item.product_image))}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.product_name}
                    </h3>
                    <p className="text-gray-600 font-medium">${item.product_price}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCartAndRemove(item.product_id)}
                    className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.product_id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WishList;
