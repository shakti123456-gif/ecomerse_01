
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

    <>

  {/* LEFT SIDEBAR (Search Bar) */}
      <div className="w-64 p-4 bg-gray-100 h-screen">
        <h2 className="text-lg font-semibold mb-3">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded"
          value={search}
          
          onChange={(e) => 
          {
            setSearch(e.target.value);
            filterProductData(e.target.value)
          }}
        />
      </div>

      <div className="p-4 flex flex-wrap gap-4">
    {productData.map((product) => (
      <div
        key={product.id}
        className="w-40 bg-white p-2 shadow rounded-lg hover:shadow-md transition"
      >
          <img
            src={product.image}
            alt={product.title}
            className="h-28 w-full object-contain mb-2"
            onClick={() => navigate(`/product/${product.id}`)}
          />

        <h2 className="font-bold text-sm h-10 overflow-hidden">
          {product.title.substring(0, 35)}...
        </h2>

        <p className="text-gray-600 text-xs h-12 overflow-hidden mb-2">
          {product.description.substring(0, 60)}...
        </p>

        <div className="font-bold text-green-600 text-sm mb-2">
          ${product.price}
        </div>

        <Link to={`/product/${product.id}`}>
        <button className="w-full bg-blue-600 text-white text-xs py-1 rounded hover:bg-blue-700">
          ProductView
        </button>
        </Link>
      </div>
    ))}
  </div>

  </>
  );
}


export default ProductPage