import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "/auth/login";

const Login = ({ setUser }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm((f) => ({
            ...f,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // so cookies are accepted
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                let info = await res.text();
                throw new Error(info || "Login failed");
            }
            const username = await res.text();
            if (setUser) setUser({ name: username, email: form.email }); // you may want to parse extra info if available

            navigate('/items')

        } catch (err) {
            setError("Login failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-7 text-center">Login</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="text-red-500 mt-2 font-medium">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
