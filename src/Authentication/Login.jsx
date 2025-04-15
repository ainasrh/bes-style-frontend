import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import URL from "../../config";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export function Login() {
  // const navigate=Navigate
  const navigate = useNavigate();
  // const [logindata, setlogindata] = useState({});

  // const inputhandle = (e) => {
  //   setlogindata({ ...logindata, [e.target.name]: e.target.value });
  //   console.log(logindata);
  // };


    const handlesubmit = async (e) => {
      e.preventDefault();
      const formData= new FormData(e.target) //get data 
      console.log('form data',formData);
      
      const logindata=Object.fromEntries(formData.entries()) // conevrt into objet
      console.log(logindata);
      
      try {

        const response = await axios.post(`${URL}/login/`, logindata);

        if (response.data.acces_token) {
          localStorage.setItem("acces_token", response.data.acces_token);
          const {user}=response.data
          toast.success("Login Succesfull");
          setTimeout(() => {
            if (user.is_staff){
              navigate('/admin')
  
            }else{
              navigate("/");
            }
            
          },2000);
          
          console.log('token',response.data.acces_token);
        } else {
          toast.error("token no recieved try. again");
        }
      } catch (error) {
        console.log("Error", error);
        toast.error("incorrect email or password. Please try again.");
      }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
        <div className="bg-white w-170 flex justify-center rounded-4xl drop-shadow-xl p-15">
          <form onSubmit={handlesubmit}>
            <h1 className="mb-9 font-bold  text-4xl text-gray-600 ">
              Login In
            </h1>
            <label htmlFor="" className="reg-label">
              Email
            </label>
            <br />
            <input
              type="text"
              name="email"
              
              className="reg-input"
            />
            <br />
            <br />
            <label htmlFor="" className="reg-label">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              
              className="reg-input"
            />
            <br />
            <br />
            <button
              type="submit"
              className="p-2 rounded-xl hover:bg-gray-700 bg-gray-300 c-white text  "
            >
              Login in
            </button>
            <br />
            <br />
            <h2>
              you have no account{" "}
              <Link className="text-blue-500" to={"/register"}>
                Sign Up
              </Link>
            </h2>
          </form>
        </div>
      </div>
      
    </>
  );

}