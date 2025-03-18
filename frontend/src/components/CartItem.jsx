import React from "react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded">
          <button
            onClick={() =>
              onUpdateQuantity(item._id, Math.max(1, item.qty - 1))
            }
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-800">{item.qty}</span>
          <button
            onClick={() => onUpdateQuantity(item._id, item.qty + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
        <div className="w-24 text-right">
          <span className="font-semibold">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
