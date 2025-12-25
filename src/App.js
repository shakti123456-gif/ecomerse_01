
import './App.css';
import React from 'react';
import ProductPage from './components/ProductPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductView from './components/ProductView';
import { CartProvider } from './components/CartContext'; 
import AddCart from './components/AddCart';


function App() {
  return (

    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<AddCart />} />
      </Routes>
    </Router>
    </ CartProvider >
    
  );
}

export default App;
