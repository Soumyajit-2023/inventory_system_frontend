import React, { useState, useEffect } from "react";

const BACKEND_URL = "/customers";

const AdminPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(BACKEND_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch customers");
                return res.json();
            })
            .then((data) => {
                console.log(data);

                setCustomers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load customers. " + err.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;
        setDeletingId(id);
        fetch(`${BACKEND_URL}/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                setCustomers((prev) => prev.filter((cust) => cust.id !== id));
                setDeletingId(null);
            })
            .catch((err) => {
                setError("Failed to delete customer. " + err.message);
                setDeletingId(null);
            });
    };

    return (
        <div className="max-w-5xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-900 mb-7 text-center">Customer Admin Panel</h2>
            {loading ? (
                <div className="text-lg text-gray-500 m-8 text-center">Loading customers...</div>
            ) : error ? (
                <div className="text-red-500 font-semibold m-8 text-center">{error}</div>
            ) : customers.length === 0 ? (
                <div className="text-gray-400 font-semibold m-8 text-center">No customers registered.</div>
            ) : (
                <table className="min-w-full border border-gray-300 text-center rounded-lg overflow-hidden">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="py-2 px-5">#</th>
                            <th className="py-2 px-5">Name</th>
                            <th className="py-2 px-5">Email</th>
                            <th className="py-2 px-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((cust, idx) => (
                            <tr key={cust.id || idx} className="even:bg-blue-50 odd:bg-white hover:bg-blue-100">
                                <td className="py-2 px-5 font-mono">{idx + 1}</td>
                                <td className="py-2 px-5">{cust.name}</td>
                                <td className="py-2 px-5">{cust.email}</td>
                                <td className="py-2 px-5">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        disabled={deletingId === cust.id}
                                        onClick={() => handleDelete(cust.id)}
                                        title="Delete customer"
                                    >
                                        {deletingId === cust.id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPage;
