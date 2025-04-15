import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import URL from "../../config";
import { StoreContext } from "../Context/Store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const { id } = useParams();
  const { fetchProducts, token } = useContext(StoreContext);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    details: "",
    stock: "",  
    size: "",
    catagory: "",
  });

  // Udpating Products end Edit
  useEffect(() => {
    const fetchUpdatingDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`${URL}/products/${id}/`);
          const product = response.data;
          setFormData({
            name: product.name,
            price: product.price,
            details: product.details,
            stock: product.stock,
            size: product.size,
            catagory:product.catagory,  
          });
          console.log("image is ", product.image);

          setImage(product.image);
        } catch (error) {
          toast.error("error from fetch updating product");
        }
      }
    };
    fetchUpdatingDetails();
  }, [id]);
  useEffect(() => {
    if (!id || id == null) {
      setFormData({
        name: "",
        price: "",
        details: "",
        stock: "",
        size: "",
        catagory: "",
      });
      setImage("");
    }
  }, [id]);

  // const handleInput = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(e.target); //Get Form data direct\
    

    let sizeArray = formData.size.split(",").map(s => Number(s.trim()));
    
    console.log(sizeArray);
    formDataToSend.append("size", JSON.stringify(sizeArray));  //convert into a json string 
    
    if (image) {
      formDataToSend.append("image", image);
    }
    try {
      const headers = {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };
      console.log('create product');
      
      const response = id
        ? await axios.put(`${URL}/products/${id}/`, formDataToSend, { headers })
        : await axios.post(`${URL}/products/`, formDataToSend, { headers });

      toast.success(id ? "Product Updated" : "Product Created");
      e.target.reset();
      setImage(null);
      fetchProducts();
    } catch (error) {
      toast.error(
        "Error saving product:",
        error.response ? error.response.data : error
      );
    }
  };
  // console.log(formData);
  

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {id ? "Update Product" : "Create New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              defaultValue={formData.name}
              name="name"
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="float"
              defaultValue={formData.price}
              name="price"
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>

            {id && image && typeof image === "string" && (
              <p className="text-gray-500 mb-2">{image.split("/").pop()}</p>
            )}

            {/* File input */}
            <input
              type="file"
              // onChange={(e}
              // onChange={handleFileChange}
              name="image"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Details
            </label>
            <textarea
              name="details"
              defaultValue={formData.details}
              placeholder="Enter product details"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              defaultValue={formData.stock}
              name="stock"
              placeholder="Enter stock quantity"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catagory
            </label>
            <input
              type="text"
              defaultValue={formData.catagory}
              name="catagory"
              placeholder="Enter Catagory"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="size"
              defaultValue={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              placeholder="e.g., 5,6,7,8"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-600 transition"
            >
              {id ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
