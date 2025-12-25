import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const AddCart = () => {
  const {
    cart=[],
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-contain"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-gray-600">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Decrease */}
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                -
              </button>

              <span>{item.quantity}</span>

              {/* Increase */}
              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
              >
                +
              </button>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Total + Clear Cart */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <h2 className="text-xl font-bold">
            Total: ${totalAmount.toFixed(2)}
          </h2>

          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCart;
