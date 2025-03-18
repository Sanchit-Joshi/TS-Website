import React from "react";
import Link from "next/link";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          href="/products"
          className="text-primary hover:text-primary-dark underline"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}

        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-4 w-full block py-2 px-4 text-center bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
