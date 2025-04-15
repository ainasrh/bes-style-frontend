import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { StoreContext } from "../Context/Store";

function SideNav() {
  const {handleLogout} =useContext(StoreContext)
  return (
    <>
    <div className="flex h-screen">
      <div className="w-64  h-screen flex flex-col bg-stone-100 items-center">
        <Link to={"/admin/"} className="w-full my-1 mt-5">
          <h1 className="py-6 text-black bg-white flex justify-center hover:bg-black hover:text-white font-semibold">
            Dashboard
          </h1>
        </Link>
        <Link to={"/admin/orders/"} className="w-full my-1">
          <h1 className="py-6 text-black bg-white flex justify-center hover:bg-black hover:text-white font-semibold">
            Orders
          </h1>
        </Link>
        <Link to={"/admin/products/"} className="w-full my-1">
          <h1 className="py-6 text-black bg-white flex justify-center hover:bg-black hover:text-white font-semibold">
            Products{" "}
          </h1>
        </Link>
        <Link to={"/admin/users/"} className="w-full my-1">
          <h1 className="py-6 text-black bg-white flex justify-center hover:bg-black hover:text-white font-semibold">
            Users
          </h1>
        </Link>
        <Link to={"/admin/createproduct/"} className="w-full my-1">
          <h1 className="py-6 text-black bg-white flex justify-center hover:bg-black hover:text-white font-semibold">
            Create Product
          </h1>
        </Link>

        <div className="w-full mt-10 " onClick={handleLogout}>
          <Link className="w-full ">
            <h1 className="py-5 text-black bg-gray-500 flex justify-center hover:bg-black hover:text-white font-semibold">
              Logout
            </h1>
          </Link>
        </div>
      </div>
      <Outlet/>
      </div>
    </>
  );
}

export default SideNav;
