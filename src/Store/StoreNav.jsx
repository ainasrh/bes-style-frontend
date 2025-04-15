import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate,Outlet } from "react-router-dom";
import { StoreContext } from "../Context/Store";
import Footer from "./footer";


export default function StoreNav() {
  
  
  const {handleLogout,isloggedin,setisloggedin,fetchCategoryData}=useContext(StoreContext)
  const [searchData,setSearchData]=useState("")

  const handlesearch=(e)=>{
    setSearchData(e.target.value)
  }
  console.log(searchData)
   useEffect(() => {
        const token = localStorage.getItem("acces_token");
      
        if(token){
          setisloggedin(true)
        }else{
          setisloggedin(false)
        }
        console.log(isloggedin)
        
        
      },[isloggedin]);
      

  return (
    <>
      <div className=" w-screen flex justify-center bg-gray-200 ">
        <h1 className="m-1">Free Shipping All Over India</h1>
      </div>
      <div className=" w-screen flex justify-around bg-gray-100">
        <div className="flex items-center gap-9">
          <Link to={"/"}>
            <img
              src="/images/BesStyle.png"
              alt=""
              className="w-40 object-cover h-20"
            />
          </Link>
          <Link to={"/"}>
            <h2 className="p-3 hover:bg-gray-200 rounded-lg">Home</h2>
          </Link>
          <Link to={"products/"}>
            <h2 className="p-3 hover:bg-gray-200 rounded-lg">Products</h2>
          </Link>
          
        </div>
        <div className="flex items-center gap-7">
          {/* Search bar */}
        <div className="flex gap-4">
            <input  className="bg-gray-200  rounded-lg focus:outline-none  focus:bg-gray-300" onChange={handlesearch} type="text" placeholder="Search Product"/>
            <h2 className="px-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer " onClick={()=>fetchCategoryData(searchData)}>Search</h2>
          </div>

          <Link to={'wishlist/'}>
            <img
              src="/images/wishlist-2.png"
              alt=""
              name="wishlist"
              className="w-10 p-1 hover:bg-red-400 rounded-lg"
            />
          </Link>
          <Link to={'/cart'}>
            <img
              src="/images/cart.png"
              alt=""
              name='cart'
              className="w-10 p-1 hover:bg-green-400 rounded"
            />
          </Link >
          {isloggedin ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-400 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={"/register"}>
                <h2 className="p-2 hover:bg-gray-400 rounded-lg cursor-pointer">Sign up</h2>
              </Link>
              <Link to={"/login"}>
                <h2 className="p-2 hover:bg-gray-400 rounded-lg cursor-pointer">Login In</h2>
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet/>
      <div>
        <Footer/>
      </div>
    </>
  );
}
