import React from "react";

const ItemCard = ({
    image,
    name,
    description,
    price,
    quantity = 0,
    onIncrement,
    onDecrement,
}) => (
    <div className="w-56 border border-gray-200 rounded-lg m-4 p-5 bg-white shadow hover:shadow-xl transition flex flex-col items-center">
        <img
            src={image}
            alt={name}
            className="w-24 h-24 object-cover rounded-md mb-3"
        />
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{name}</h4>
        <div className="text-gray-500 text-sm mb-2 text-center">
            {description}
        </div>
        <div className="text-blue-600 font-bold text-base mb-3">₹{price}</div>
        <div className="flex items-center w-full mt-1">
            {quantity <= 0 ? (
                <button
                    onClick={onIncrement}
                    className="flex-1 py-1.5 px-0 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                    Add
                </button>
            ) : (
                <div className="flex flex-1 justify-between items-center">
                    <button
                        onClick={onDecrement}
                        className="w-8 h-8 bg-gray-200 text-lg font-bold rounded-full hover:bg-gray-300 transition"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="px-4 select-none text-[1.1rem] font-medium">{quantity}</span>
                    <button
                        onClick={onIncrement}
                        className="w-8 h-8 bg-blue-500 text-lg font-bold text-white rounded-full hover:bg-blue-600 transition"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    </div>
);

export default ItemCard;
