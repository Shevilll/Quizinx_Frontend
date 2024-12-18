import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); // Initialize the navigation function

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">
                Welcome to Quizinx
            </h1>
            <div className="grid grid-cols-1 gap-8">
                <button
                    onClick={() => navigate("/PlayQuiz")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-lg shadow-xl hover:shadow-2xl transform transition-all hover:scale-105"
                >
                    Play Quiz
                </button>
            </div>
        </div>
    );
}

export default Home;
