import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { initializeRazorpayPayment } from "../utils/razorpay";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "razorpay",
  });

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate("/cart");
    }

    // Load user profile data if logged in
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await axios.get("/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setFormData({
            ...formData,
            name: data.name,
            email: data.email,
            phone: data.phone || "",
            address: data.address?.street || "",
            city: data.address?.city || "",
            postalCode: data.address?.postalCode || "",
            country: data.address?.country || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create order in database
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.images[0],
          price: item.price,
          product: item._id,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        taxPrice: cartTotal * 0.18, // 18% tax
        shippingPrice: 100, // Fixed shipping price
        totalPrice: cartTotal + (cartTotal * 0.18) + 100,
      };

      const token = localStorage.getItem("token");
      const { data } = await axios.post("/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If payment method is Razorpay, initiate payment
      if (formData.paymentMethod === "razorpay") {
        try {
          const result = await initializeRazorpayPayment(data._id, data.totalPrice);
          if (result.success) {
            clearCart();
            navigate(`/order-success/${data._id}`);
          }
        } catch (paymentError) {
          setError("Payment failed. Please try again.");
          return;
        }
      } else if (formData.paymentMethod === "cod") {
        // Cash on delivery
        clearCart();
        navigate(`/order-success/${data._id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during checkout"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Payment Method</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === "razorpay"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="razorpay"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Razorpay (Credit/Debit Card, UPI, etc.)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="cod"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between py-2">
                <span>{item.name} x {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax (18%)</span>
                <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping</span>
                <span>₹100</span>
              </div>
              <div className="flex justify-between py-2 font-bold border-t mt-2">
                <span>Total</span>
                <span>₹{(cartTotal + (cartTotal * 0.18) + 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
                