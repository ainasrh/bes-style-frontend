import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { StoreContext } from "../Context/Store";
import { decodeAndCorrectImageUrl } from "../utils/decodeAndCorrectImageUrl";

function Products() {
  const { products, categoryProducts, selectedCategory, setproducts,setCategoryProducts,setSelectedCategory } = useContext(StoreContext);
  console.log("Products:", products);
  console.log("Selected Category:", selectedCategory);
  console.log("Category Products:", categoryProducts)
  const handleClick = () => {
    setCategoryProducts([]);
    setSelectedCategory(null);
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="m-20">
      { categoryProducts?.length > 0 && <button className=" bg-blue-400 hover:bg-blue-600 px-6 py-2" onClick={handleClick}>View All Products</button>}
        <h1 className="font-medium text-3xl flex justify-center mb-10">Products</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {(selectedCategory ? categoryProducts : products).map((product) => (
            <ProductCard key={product.id} name={product.name} image={decodeAndCorrectImageUrl(product.image_url)} id={product.id} />
          ))}
        </div>
        {}
      </div>
    </div>
  );
}

export default Products;
