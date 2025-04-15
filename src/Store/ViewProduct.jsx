import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URL from "../../config";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/Store";
import { decodeAndCorrectImageUrl } from "../utils/decodeAndCorrectImageUrl";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addtocart, token } = useContext(StoreContext);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    
  };
  console.log(selectedSize)
  const handlewishlist = async (product_id) => {
    try {
      console.log(product_id);
      const response = await axios.post(
        `${URL}/wishlist/${product_id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (erorr) {
      console.log({ error: "error from wishlist" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/products/${id}/`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {product ? (
        <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg p-8 flex max-w-4xl w-full items-center gap-12">
            <div className="w-1/2 flex justify-center">
              <img
                className="w-full h-96 object-cover rounded-lg shadow-md"
                src={decodeAndCorrectImageUrl(product.image_url)}
                alt={product.name}
              />
            </div>

            <div className="w-1/2 space-y-4">
              <h1 className="font-bold text-3xl text-gray-800">
                {product.name}
              </h1>
              <h2 className="text-2xl font-semibold text-green-600">
                ${product.price}
              </h2>

              <div className="flex gap-5 mt-6">
                <button
                  onClick={() => addtocart(id)}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
                >
                  Add To Cart
                </button>
                <img
                  onClick={() => handlewishlist(id)}
                  src="/images/wishlist-2.png"
                  alt="wishlist"
                  className="w-12 p-2 bg-red-100 hover:bg-red-200 rounded-lg shadow-md cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Size
                </label>
                <div className="flex gap-2">
                  {["5", "6", "7", "8", "9", "10"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "bg-green-500 text-white border-green-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      }`} 
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-6">
                <span className="font-semibold text-gray-800">
                  About The Item:
                </span>{" "}
                {product.details}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center text-red-500 font-semibold mt-10">
          Product not found
        </h2>
      )}
    </>
  );
}

export default ViewProduct;
