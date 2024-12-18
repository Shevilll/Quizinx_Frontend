import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlayQuiz = () => {
    const [quizzes, setQuizzes] = useState([]); // State to store quiz data
    const navigate = useNavigate(); // Initialize the navigation function

    useEffect(() => {
        // Fetch quiz data when the component mounts
        axios
            .get("https://quizinx-backend.onrender.com/api/v1/quiz")
            .then((response) => {
                setQuizzes(response.data); // Update the state with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen">
            {/* Back Button */}
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110"
                >
                    {"< Back"}
                </button>
            </div>

            <div className="max-w-3xl mx-auto mt-10">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Available Quizzes
                </h2>
                {quizzes.length > 0 ? (
                    <ul className="space-y-6">
                        {quizzes.map((quiz) => (
                            <li
                                key={quiz.id}
                                className="p-6 border-2 border-gray-300 rounded-xl bg-white shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                    {quiz.title}
                                </h3>
                                <p className="text-lg text-gray-600">
                                    No. of questions: {quiz.question_count}
                                </p>

                                {/* Button to go to quiz details */}
                                <button
                                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                                    className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
                                >
                                    Start Quiz
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white text-lg text-center"></p>
                )}
            </div>
        </div>
    );
};

export default PlayQuiz;
