import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import URL from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const  StoreContext = createContext();

export function Store({ children }) {
  const [token, setToken] = useState(localStorage.getItem("acces_token")|| "");
  const [cart, setCart] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [orderproducts, setorderproducts] = useState([]);
  const [categoryProducts,setCategoryProducts]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);


  /////////////////////// FETCH CART /////////////////////////
  const fetchCartData = async () => {
    try {
      if (!token) {
        console.log("No authentication token found");
        return;
      }

      const response = await axios.get(`${URL}/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(response.data);
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [token]); //  Run whenever `token` changes

  ////////////////////////// UPDATE QUANTITY ///////////////////////
  const updateQuantity = async (productId, action) => {
    try {
      await axios.patch(
        `${URL}/cart/${productId}/`,
        { action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCartData();
      toast.success('quantity updated')
    } catch (error) {
      toast.error("Error updating quantity:", error);
    }
  };

  ///////////////////// DELETE CART PRODUCT /////////////////////
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${URL}/cart/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCartData();
      toast.success('deleted succefully') //  Ensure cart updates after delete
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    /////////// ADD TO CART////////
  };
  const addtocart = async (productid) => {
    // console.log(token);
    
    try {
      const response = await axios.post(`${URL}/cart/`,
        {
          product_id:productid,
          quantity:1
        },
        {
          headers:{
          Authorization:`Bearer ${token}`}
        }
      )
      toast.success('item has added')
      fetchCartData()
    } catch (error) {
      toast.error({ "add to cart erorr": error });
    }
  };

////////////LOG OUT////////////

  const handleLogout = () => {
    localStorage.removeItem("acces_token");
    setisloggedin(false);
    navigate("/login");
  };
  /////// FETCH PRODUCTS //////////////
  const fetchProducts= async ()=>{
    try{

      const response =  await axios.get(`${URL}/products/`)
      setproducts(response.data)
      console.log(response.data)
    }catch(error){
      console.log('error',error.response)
    }
  }
  useEffect(() => {
    fetchProducts() 
    },[]);
    

  // /// FETCH ORDERS //

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${URL}/allorders`,
          {
            headers:{Authorization : `Bearer ${token}`}
          }
        );
        setorderproducts(response.data);
      } catch (error) {
        console.log("Error fetching all orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Fetch catagory//////
  
  const fetchCategoryData = async (categoryName) => {
    try {
      if (categoryName === null) {
        setSelectedCategory(null);
        setCategoryProducts([]);
      } else {
        const response = await axios.get(`${URL}/category/${categoryName}`);
        console.log("Fetched category data:", response.data)
        setCategoryProducts(response.data);
        setSelectedCategory(categoryName);
        navigate('products')
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };
  
  useEffect(()=>{
    console.log('updated catagory',selectedCategory)
  },[selectedCategory])


  const handleClick = (products) =>{
    console.log("change")
    setproducts(products)
    navigate("products")
  }

 
  return (
    <StoreContext.Provider
      value={{ 
        cart, 
        setCart, 
        token, 
        updateQuantity, 
        handleDelete,
        addtocart,
        handleLogout,
        setisloggedin,
        isloggedin,
        products,
        setproducts,
        fetchProducts,
        orderproducts,
        fetchCategoryData,
        categoryProducts,
        selectedCategory,
        setCategoryProducts,
        setSelectedCategory,
        handleClick

      
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
