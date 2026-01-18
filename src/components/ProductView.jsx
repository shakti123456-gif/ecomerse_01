import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./ProductPage.css";


const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return <h2 className="status-msg">Loading...</h2>;
  if (error) return <h2 className="status-msg">Error: {error}</h2>;
  if (!product) return <h2 className="status-msg">Product not found</h2>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-view-container">
      <div className="product-view-card">

        <img
          src={product.image}
          alt={product.title}
          className="product-view-image"
        />

        <div className="product-view-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>${product.price}</h3>

          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductView;
