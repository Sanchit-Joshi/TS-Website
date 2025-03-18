import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <Link href={`/product/${product._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-75 transition-opacity duration-300"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {product.discount}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium
                     hover:bg-blue-700 transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
