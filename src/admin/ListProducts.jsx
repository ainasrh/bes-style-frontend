import React from "react";
import { useContext } from "react";
import { StoreContext } from "../Context/Store";
import axios from "axios";
import URL from "../../config";
import { Link, useNavigate } from "react-router-dom";


export default function ListProducts() {
  const { products,fetchProducts } = useContext(StoreContext);
  const navigate=useNavigate()
  console.log(products)

  const handleDelete= async (pk)=>{
    const response= await axios.delete(`${URL}/products/${pk}/`)
    fetchProducts()

  }
  const handleUpdate= async(pk)=>{
    navigate('/admin/createproduct/')
    
    try{
      const response= await axios.put(`${URL}/products/${pk}/`)
    }catch(error){
      console.log(error.response)
    }
  }

  // console.log(por)
  
  

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Product List</h1>
        {products.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3  text-left pl-30 text-sm font-semibold text-gray-700 uppercase ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{product.id}</td>
                    <td className="px-6 py-4">
                      
                      <img
                        src={decodeURIComponent(product?.image_url).replace("/https","https")}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      ${product.price}
                    </td>
                  
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {product.stock || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 ">
                    <button onClick={()=>handleDelete(product.id)} className="py-2 px-2 bg-red-100  rounded-lg hover:bg-red-500 hover:text-black m-2 w-30">Delete Prodcut</button>
                    <Link to={`/admin/createproduct/${product.id}`}><button  className="py-2 px-2 bg-green-100  rounded-lg hover:bg-green-500 hover:text-black w-30">Edit Product</button></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}