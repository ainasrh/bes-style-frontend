import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/Store";
import URL from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { decodeAndCorrectImageUrl } from "../utils/decodeAndCorrectImageUrl";

function Checkout() {
  const navigate=useNavigate()
  const { cart,token } = useContext(StoreContext);
  const [shippingAdress, setShippingAdress] = useState({
    name:'',
    address:'',
    city:'',
    state:'',
    zipcode:'',
  });
  const [razorpayOrder,setRazorpayOrder]=useState(null)
  
  // const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInpute = (e) => {
    setShippingAdress({ ...shippingAdress, [e.target.name]: e.target.value });
  };
  console.log(shippingAdress);
  // const handlePayment=((e)=>{
  //   setPaymentMethod(e.target.value)
  // })
  // console.log('payment method',paymentMethod)
  console.log(cart);
  
  

  const openRazorpayPayment=(razorpay_order)=>{
    console.log('open razorpay working')
    const options={
      key:'rzp_test_VYiv6q9vw6vBQa', //razorpay key
      amount:razorpay_order.amount,
      currency:razorpay_order.currency,    // key are cumplosary razorpay integrate based on this keys 
      order_id:razorpay_order.id,     
      handler: function (response){
        const paymentId=response.razorpay_payment_id
        console.log('payment succesful!',paymentId);
        // refresh order 

        // fetchproducts()
        navigate('/')
      },
      prefill:{
        name:"customer Name",
        email:"customer@example.com",
        contact:'1234567890'
      },
      theme:{
        color: "#00faed",
      },
    }
    const rzp=new window.Razorpay(options);
    rzp.open()

  };


  const handleCheckout= async ()=>{
    if (!token){
      toast.error('user not authenticated')
      return;

    }
    try{
      const requestData={
        shipping_address:shippingAdress,
        // paymentMethod:paymentMethod,  
      } 
      
      console.log(requestData)
      const response= await axios.post(`${URL}/orders/`,requestData,
        {
          headers :{Authorization : `Bearer ${token}`}
        }
      )
      
      // / PAYMENT GETWAY RESPONSE  
      console.log('Checkout  api response:',response.data);
      console.log('razorpay response,:',response.data.razorpay_order)
      const api_data=response.data

      if (api_data.razorpay_order){
        setRazorpayOrder(api_data.razorpay_order);
        openRazorpayPayment(api_data.razorpay_order) 
      }else{
        toast.error('failed to initiate payment. please try again')
      }
    }catch(error){
      console.error('error during checkout :',error)
      toast.error('checkout failed . please try again')
      
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center w-screen min-h-screen p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Left Section*/}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={handleInpute}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={handleInpute}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleInpute}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleInpute}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    name="zipcode"
                    onChange={handleInpute}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right div section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>
            {cart?.cartItems?.length > 0 ? (
              <div className="space-y-4">
                {cart.cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4">
                    {/* order item  */}
                    <div className="flex items-center justify-between gap-4">
                      <img
                        src={decodeAndCorrectImageUrl(item.product_image)}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="text-gray-800 font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">${item.product_price}</p>
                      </div>

                      <div className="text-gray-800 w-30">
                        <span className="mr-4">x{item.quantity}</span>
                        <span className="w-30">
                          ${item.product_price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No items in cart</p>
            )}
            <div className="text-lg font-bold text-gray-900 my-4">
              <h2>Total: ${cart.total_amount?.toFixed(2)}</h2>
            </div>
            <button onClick={handleCheckout} className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
