

import React, { useState } from "react";

const Cart = ({ items, onRemove, onClear, user }) => {
    const [placing, setPlacing] = useState(false);
    const [message, setMessage] = useState("");

    const placeOrder = async () => {
        setMessage("");
        setPlacing(true);

        console.log("hi");

        try {


            // Step 1: Get all customers to resolve current user's customerId
            const res = await fetch("/customers");
            console.log(res);

            if (!res.ok) throw new Error("Failed to fetch users");
            const customers = await res.json();
            const current = customers.find((u) => u.email === user.email);
            if (!current || !current.id) throw new Error("User not found");

            // Step 2: For each cart item, place order
            for (const { item, quantity } of items) {
                const orderRes = await fetch("/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customerId: current.id,
                        itemId: item.id ?? item.itemId ?? item.id,
                        quantity,
                    }),
                });
                if (!orderRes.ok) {
                    let info = await orderRes.text();
                    throw new Error(`Order failed for ${item.name}: ${info}`);
                }
            }
            setMessage("Order placed successfully! 🎉");
            onClear();
        } catch (err) {
            setMessage(
                typeof err === "string" ? err : (err.message || "Order placement failed.")
            );
            // Do not clear cart if an error happened
            return;
        } finally {
            setPlacing(false);
        }
    };

    const cartIsEmpty = !items || items.length === 0;

    return (
        <div className="w-80 min-h-[300px] bg-white border border-gray-200 rounded-2xl shadow-md p-5 m-4 flex flex-col">
            <h3 className="text-xl font-bold border-b border-gray-200 pb-3 mb-4">Cart</h3>
            {items && items.length ? (
                <div className="flex-grow space-y-3">
                    {items.map(({ item, quantity }) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                    {item.name}
                                </span>
                                <span className="text-xs text-gray-500">x {quantity}</span>
                            </div>
                            <span className="font-bold text-blue-700">₹{item.price}</span>
                            <button
                                onClick={() => onRemove(item.name)}
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
                <>
                    <button
                        onClick={onClear}
                        className="mt-7 w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                        disabled={placing}
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={placeOrder}
                        className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                        disabled={placing || cartIsEmpty || !user}
                    >
                        {placing ? "Placing Order..." : "Place Order"}
                    </button>
                </>
            )}
            {message && (
                <div
                    className={`mt-4 text-center text-sm font-semibold ${message.includes("success") ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default Cart;
