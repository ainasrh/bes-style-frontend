import React from "react";

import Card from "./Card/";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="w-screeen">
        <div className="relative w-screen h-screen">
          {/* main background shoe image */}
          <img
            src="images/jordan.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
            <h1 className="text-4xl font-bold text-white">
              Welcome to Bes style
            </h1>
            <p className="text-lg text-gray-100 mt-4 w-3/4">
              discover the latest sneaker colletions with premium designs and
              comfort
            </p>
            
              <button className="mt-6 px-6 py-2 text-lg bg-stone-200 hover:bg-stone-400" onClick={()=>{
                document.getElementById('catagory-section').scrollIntoView({behavior:"smooth"})
              }}>
                Collection
              </button>
            
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mr-30">
            <img
              src="images/RS-X EFEKT PREMIUM 'SUGARED ALMOND PUTTY-WARM WHITE'.jpg"
              alt=""
              className="h-120 mt-20"
            />
          </div>
          <div className="w-100 pt-30 ml-30 ">
            <h1 className="mb-10 font-bold text-2xl">
              STYLISH BRANDED SNEAKER COLLECTION
            </h1>
            <p className="font-medium">
              Welcome to Bes Style, your ultimate destination for stylish,
              high-performance sneakers! Whether you're an athlete looking for
              the latest running shoes, a fashion enthusiast searching for
              limited-edition kicks, or someone in need of everyday comfort, we
              have something for everyone. Explore a wide selection of top
              brands, from classic designs to the hottest releases. Our
              user-friendly platform offers easy browsing, detailed product
              information, and customer reviews to help you make informed
              decisions. Enjoy fast, secure checkout, and get your new favorite
              pair delivered right to your doorstep. Step up your footwear game
              with us today!.
            </p>
          </div>
        </div>
        <div>
          {/* PRODUCTS CATAGORY */}
          <div className="max-w-6xl mx-auto px-4 my-20 " id="catagory-section">
            <h2 className="text-3xl font-bold text-center mt-10 text-gray-800">
              Explore Our Collection
            </h2>

            <div className="flex justify-center gap-30 items-center m-20">
              <Card name={"ADIDAS"} image={"images/adidas.png"} />
              <Card name={"NIKE"} image={"images/NIKE.jpeg"} />
              <Card name={"PUMA"} image={"images/PUMA.jpeg"} />
            </div>
          </div>
        </div>

        <div>
          {/* second background image */}
          <div className=" relative w-screen h-200">
            <img
              src="images/background3.webp"
              alt=""
              className="w-screen h-200 object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-5">
              <h4 className="text-lg text-black font-bold mt-4 w-3/4">"Step into Style  Find Your Perfect Pair Today!"</h4>
              <Link to={'/products'}><button className="mt-6 px-6 py-2 text-lg bg-stone-200 hover:bg-stone-400">Shop Now</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
