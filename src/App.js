import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductPage from './components/ProductPage';
import ProductView from './components/ProductView';
import AddCart from './components/AddCart';
import Navbar from './components/Navbar';
import { CartProvider } from './components/CartContext';
import Footer from './components/Footer';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />   {/* ✅ Navbar inside Router */}

        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/cart" element={<AddCart />} />
        </Routes>
      </Router>
      <Footer />
    </CartProvider>
  );
}

export default App;
