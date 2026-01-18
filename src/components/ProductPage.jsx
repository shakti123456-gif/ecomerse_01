import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [ActualProductData, setActualProductData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProductData(response.data);
        setActualProductData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProductData();
  }, []);

  const filterProductData = (data) => {
    if (data === "") {
      setProductData(ActualProductData);
      return;
    }

    const filtered = ActualProductData.filter((item) =>
      item.title.toLowerCase().includes(data.toLowerCase())
    );

    setProductData(filtered);
  };

  return (
    <div className="page-container">

      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <h2 className="sidebar-title">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            filterProductData(e.target.value);
          }}
        />
      </div>

      {/* PRODUCT GRID */}
      <div className="content">
        <div className="product-grid">

          {productData.map((product) => (
            <div className="product-card" key={product.id}>

              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                onClick={() => navigate(`/product/${product.id}`)}
              />

              <h2 className="product-title">
                {product.title}
              </h2>

              <p className="product-desc">
                {product.description}
              </p>

              <div className="product-price">
                ${product.price}
              </div>

              <Link to={`/product/${product.id}`}>
                <button className="product-btn">
                  View Product
                </button>
              </Link>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default ProductPage;
