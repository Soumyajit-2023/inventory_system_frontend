import React from "react";

const ItemCard = ({ image, name, description, price, onAddToCart }) => (
    <div className="w-56 border border-gray-200 rounded-lg m-4 p-5 bg-white shadow hover:shadow-xl transition flex flex-col items-center">
        <img
            src={image}
            alt={name}
            className="w-24 h-24 object-cover rounded-md mb-3"
        />
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{name}</h4>
        <div className="text-gray-500 text-sm mb-2 text-center">{description}</div>
        <div className="text-blue-600 font-bold text-base mb-3">₹{price}</div>
        <button
            onClick={onAddToCart}
            className="w-full py-1.5 px-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
            Add to Cart
        </button>
    </div>
);

export default ItemCard;
