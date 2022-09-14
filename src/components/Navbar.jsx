import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/auth-context";

const Navbar = () => {
    const { user, logOut, logIn } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/signin");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
            <Link to="/">
                <h1 className="text-red-600 text-4xl font-bold cursor-pointer">NETFLIX</h1>
            </Link>
            {user?.email ? (
                <div>
                    <Link to="/account">
                        <button className="text-white pr-4">Account</button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-6 py-2 rounded  cursor-pointer"
                    >
                        Logout{" "}
                    </button>
                </div>
            ) : (
                <div>
                    <Link to="/">
                        <button
                            onClick={() => {
                                logIn("test@gmail.com", "password");
                            }}
                            className="text-white pr-3 sm:pr-4 text-sm sm:text-base"
                        >
                            Demo
                        </button>
                    </Link>
                    <Link to="/signin">
                        <button className="text-white pr-2 sm:pr-4 text-sm sm:text-base">Sign In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-red-600 text-white px-6 py-2 rounded  cursor-pointer  text-sm sm:text-base">
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
