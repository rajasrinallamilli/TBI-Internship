import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(res.data.user);

            } catch (error) {

                toast.error("Unable to load profile");

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        toast.success("Logged out successfully");

        window.location.href = "/login";

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <>
            <Navbar />

            <div className="max-w-4xl mx-auto p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-2xl font-semibold">
                        Welcome, {user.name} 👋
                    </h2>

                    <p className="mt-4">
                        <strong>Name :</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email :</strong> {user.email}
                    </p>

                    <button
                        onClick={logout}
                        className="mt-6 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Dashboard;