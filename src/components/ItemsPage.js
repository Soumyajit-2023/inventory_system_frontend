import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import Cart from "./Cart";

const BACKEND_URL = "/api/item-store/test-items";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(BACKEND_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch items");
                return res.json();
            })
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load items. " + err.message);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (item) => {
        setCart((c) => [...c, item]);
    };
    const handleRemoveFromCart = (idx) => {
        setCart((c) => c.filter((_, i) => i !== idx));
    };
    const handleClearCart = () => setCart([]);

    return (
        <div className="flex items-start min-h-screen px-4 py-8 md:px-12 bg-gradient-to-bl from-blue-50 to-blue-100">
            <div className="flex-1 mr-8">
                <div className="flex items-center justify-between mb-7">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900 mb-1 tracking-tight">Marketplace</h2>
                        <div className="text-gray-500">Browse and add items to your cart</div>
                    </div>
                    <div className="relative">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white font-semibold text-sm shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.34 2H21M7 13h14l-1.68 9H8.68L7 13zm4 0V8m4 5V8m4
                                5V8M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                            </svg>
                            {cart.length} in cart
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-8">
                    {loading ? (
                        <div className="text-lg text-gray-500 m-8 col-span-full">Loading items...</div>
                    ) : error ? (
                        <div className="text-red-500 font-semibold m-8 col-span-full">{error}</div>
                    ) : items.length === 0 ? (
                        <div className="text-gray-400 font-semibold m-8 col-span-full">No items found.</div>
                    ) : (
                        items.map((item, i) => (
                            <ItemCard
                                key={i}
                                image={item.imageUrl}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                onAddToCart={() => handleAddToCart(item)}
                            />
                        ))
                    )}
                </div>
            </div>
            <aside className="relative w-[340px] flex-shrink-0">
                <div className="sticky top-8">
                    <Cart items={cart} onRemove={handleRemoveFromCart} onClear={handleClearCart} />
                </div>
            </aside>
        </div>
    );
};

export default ItemsPage;
