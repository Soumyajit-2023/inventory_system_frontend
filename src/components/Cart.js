import React from "react";

const Cart = ({ items, onRemove, onClear }) => (
    <div className="w-80 min-h-[300px] bg-white border border-gray-200 rounded-2xl shadow-md p-5 m-4 flex flex-col">
        <h3 className="text-xl font-bold border-b border-gray-200 pb-3 mb-4">Cart</h3>
        {items && items.length ? (
            <div className="flex-grow space-y-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                    >
                        <span className="font-semibold text-gray-700">{item.name}</span>
                        <span className="font-bold text-blue-700">₹{item.price}</span>
                        <button
                            onClick={() => onRemove(idx)}
                            className="ml-4 px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-300 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-gray-400 italic">Your cart is empty.</div>
        )}
        {items && items.length > 0 && (
            <button
                onClick={onClear}
                className="mt-7 w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
                Clear Cart
            </button>
        )}
    </div>
);

export default Cart;
