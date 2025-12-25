import React from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { CartContext } from "./CartContext";



const ProductView = () => {

  const { addToCart } = useContext(CartContext);

    const {id}=useParams();
    const navigate=useNavigate();
    const [product,setProductData]=React.useState([]);
    const [loading,setLoading]=React.useState(false);
    const [error,setError]=React.useState(null);

    React.useEffect(()=>{
        const fetchProductData =async()=>{
            setLoading(true)
            try{
                const response =await axios.get('https://fakestoreapi.com/products/'+id);
                setProductData(response.data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }

        }

        fetchProductData();
    },[id]);
    if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
    if (error) return <h2 className="text-center mt-10">Error: {error}</h2>;
    if (!product) return <h2 className="text-center mt-10">Product not found</h2>;

    const handleAddToCart = () => {
      addToCart(product);
      navigate('/cart');
    }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6 p-6">
        {/* Image */}
        <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-64 object-contain rounded-lg"
            />

        {/* Details */}
        <div className="flex flex-col justify-start md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-500 mb-2">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
          <div className="text-2xl font-bold text-green-600 mb-4">${product.price}</div>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}



export default ProductView