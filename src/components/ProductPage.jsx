
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const ProductPage = () => {
  const navigate = useNavigate();
  const [productData,setProductData]=useState([]);
  const [ActualProductData,setActualProductData]=useState([]);
  const [search,setSearch]=useState("")

  useEffect(() => {
  const fetchProductData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      console.log("Fetched product data:", response.data);
      setProductData(response.data);
      setActualProductData(response.data);

    } catch (err) {
      console.log(err.message);
    }
  };

  fetchProductData();
  }, []);


    const filterProductData = (data) => {
      
      if (data===""){

        setProductData(ActualProductData);
        return;
      }

      console.log("Filtering with:", data);
      var t=productData.filter(item=> item.title.toLowerCase().includes(data.toLowerCase()))
      
      console.log("Filtered data:", t);
      
      setProductData(t);

    }

    

  return (
  <div className="flex min-h-screen bg-gray-50">

    {/* LEFT SIDEBAR */}
    <div className="w-64 p-4 bg-gray-100 border-r">
      <h2 className="text-lg font-semibold mb-3">Search</h2>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          filterProductData(e.target.value);
        }}
      />
    </div>

    {/* PRODUCT GRID */}
    <div className="flex-1 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-3 cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            />

            <h2 className="font-semibold text-sm mb-1 line-clamp-2">
              {product.title}
            </h2>

            <p className="text-gray-500 text-xs mb-2 line-clamp-3">
              {product.description}
            </p>

            <div className="font-bold text-green-600 mb-3">
              ${product.price}
            </div>

            <Link to={`/product/${product.id}`}>
              <button className="w-full bg-blue-600 text-white text-sm py-1.5 rounded hover:bg-blue-700">
                View Product
              </button>
            </Link>
          </div>
        ))}

      </div>
    </div>

  </div>
);
}


export default ProductPage