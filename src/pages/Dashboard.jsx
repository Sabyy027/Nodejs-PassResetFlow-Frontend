import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="w-full max-w-2xl p-8 space-y-6 text-center bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800"> Welcome to Your Dashboard! </h1>
            <p className="mt-4 text-lg text-gray-600">
                You are successfully logged in!!!.
            </p>
            <div className="mt-8 border-t pt-6">
                <button onClick={handleLogout}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;