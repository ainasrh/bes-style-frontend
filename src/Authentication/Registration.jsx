import React, { useState } from "react";
import axios from 'axios';
import './style.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import URL from "../../config";

export function Registration() {
  const navigate=useNavigate()
  // const [regdata, setregdata] = useState({
  //   username:'',
  //   email:'',
  //   passowrd:'',
  //   confirm_password:''
  // });

  // const inputhandle = (e) => {
  //   setregdata({ ...regdata, [e.target.name]: e.target.value });
  //   console.log(regdata);
  // };

  const handlesubmit = async (e) => {
    e.preventDefault(e);
    const formData= new FormData(e.target); 
    const regdata=Object.fromEntries(formData.entries());
    try {
      const response = await axios.post(`${URL}/reg/`, regdata);
      navigate('/login')
      toast.success(response.data.message);
    } catch (error) {
      
      console.log("Error", error.response)
      toast.error("passworddgdsf or email not valid Try Again,Check Email");
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
      <div className="bg-white w-170 flex justify-center rounded-4xl drop-shadow-xl p-15">
        <form onSubmit={handlesubmit} >
          <h1 className="mb-9 font-bold  text-4xl text-gray-600 ">Register</h1>
          <label htmlFor="" className="reg-label">Username</label>
          <br />
          <input type="text" name="username" className="reg-input" />
          <br />
          <br />
          <label htmlFor=""  className="reg-label">Email</label>
          <br />
          <input type="email" name="email"  className="reg-input"/>
          <br />
          <br />
          <label htmlFor=""  className="reg-label">Password</label>
          <br />
          <input type="password" name="password" className="reg-input" />
          <br />
          <br />
          <label htmlFor=""  className="reg-label">Confirm Password</label>
          <br />
          <input type="password" name="confirm_password" className="reg-input" />
          <br />
          <br />
          <button type="submit" className="p-2 rounded-xl hover:bg-gray-700 bg-gray-300 c-white text ">Sign Up</button>
          <br /><br />
          <h2>You Already Have An Account <Link to={'/login'} className="text-blue-500">Login In</Link></h2>
        </form>
      </div>
    </div>
    </>
  );
}