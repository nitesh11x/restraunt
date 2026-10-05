import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { isUserLogin, setIsUserLogin } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsUserLogin(false);
        setMenuOpen(false);
        navigate("/");
        toast.success("user logout success")
    };

    console.log("User Login:", isUserLogin);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-3xl">🍽️</span>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            FoodHub
                        </h1>

                        <p className="text-xs text-gray-500">
                            Restaurant
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        to="/"
                        className="font-medium text-red-500 transition hover:text-red-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/menu"
                        className="font-medium text-gray-600 transition hover:text-red-500"
                    >
                        Menu
                    </Link>

                    <Link
                        to="/about"
                        className="font-medium text-gray-600 transition hover:text-red-500"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="font-medium text-gray-600 transition hover:text-red-500"
                    >
                        Contact
                    </Link>

                    {/* Login / Logout */}
                    {isUserLogin ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-lg cursor-pointer bg-gray-900 px-5 py-2.5 font-semibold text-white transition hover:bg-gray-800"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-lg cursor-pointer bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-gray-700 md:hidden"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="border-t border-gray-100 bg-white px-6 py-5 md:hidden">
                    <div className="flex flex-col gap-5">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="font-medium text-red-500"
                        >
                            Home
                        </Link>

                        <Link
                            to="/menu"
                            onClick={() => setMenuOpen(false)}
                            className="font-medium text-gray-600 hover:text-red-500"
                        >
                            Menu
                        </Link>

                        <Link
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                            className="font-medium text-gray-600 hover:text-red-500"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="font-medium text-gray-600 hover:text-red-500"
                        >
                            Contact
                        </Link>

                        {/* Mobile Login / Logout */}
                        {isUserLogin ? (
                            <button
                                onClick={handleLogout}
                                className="w-full rounded-lg cursor-pointer bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="w-full rounded-lg cursor-pointer bg-red-500 px-5 py-3 text-center font-semibold text-white hover:bg-red-600"
                            >
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
