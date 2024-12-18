import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizDetail = () => {
    const { quiz_id } = useParams();
    const [quizDetails, setQuizDetails] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://quizinx-backend.onrender.com/api/v1/quiz${quiz_id}/`)
            .then((response) => {
                setQuizDetails(response.data);
                axios
                    .get(
                        `https://quizinx-backend.onrender.com/api/v1/quizquestions/${quiz_id}/`
                    )
                    .then((res) => {
                        setQuestions(res.data);
                        setAnswers(new Array(res.data.length).fill(null));
                    })
                    .catch((err) =>
                        console.error("Error fetching questions:", err)
                    );
            })
            .catch((error) => {
                console.error("Error fetching quiz details:", error);
            });
    }, [quiz_id]);

    const handleAnswerChange = (questionIndex, answerId) => {
        if (!submitted) {
            // Allow answer change only if quiz is not submitted
            const newAnswers = [...answers];
            newAnswers[questionIndex] = answerId;
            setAnswers(newAnswers);
        }
    };

    const handleSubmit = () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = answers[index];
            const correctAnswer = question.answers.find(
                (answer) => answer.is_right
            );
            if (selectedAnswer === correctAnswer.id) {
                totalScore += 1;
            }
        });
        setScore(totalScore);
        setSubmitted(true);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen">
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={() => navigate("/PlayQuiz")}
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110"
                >
                    {"< Back"}
                </button>
            </div>

            {quizDetails ? (
                <>
                    <h2 className="text-3xl font-bold text-center text-white mb-6">
                        {quizDetails.title}
                    </h2>

                    {questions.length > 0 ? (
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                                Question {currentQuestionIndex + 1}
                            </h3>
                            <div className="mb-6 p-6 bg-white rounded-lg shadow-lg">
                                <p className="text-xl font-medium text-gray-700 mb-4">
                                    {questions[currentQuestionIndex].title}
                                </p>
                                <ul className="space-y-4">
                                    {questions[
                                        currentQuestionIndex
                                    ].answers.map((answer) => {
                                        const isCorrectAnswer =
                                            answer.is_right && submitted;
                                        const isIncorrectAnswer =
                                            answers[currentQuestionIndex] !==
                                                answer.id &&
                                            submitted &&
                                            answer.is_right === false;
                                        return (
                                            <li
                                                key={answer.id}
                                                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                                                    isCorrectAnswer
                                                        ? "bg-green-100 border-green-500"
                                                        : isIncorrectAnswer
                                                        ? "bg-red-100 border-red-500"
                                                        : answers[
                                                              currentQuestionIndex
                                                          ] === answer.id
                                                        ? "bg-blue-100 border-blue-500"
                                                        : "bg-gray-50 border-gray-300"
                                                }`}
                                            >
                                                <label className="w-full flex items-center space-x-4">
                                                    <input
                                                        type="radio"
                                                        name={`question-${questions[currentQuestionIndex].id}`}
                                                        value={answer.id}
                                                        checked={
                                                            answers[
                                                                currentQuestionIndex
                                                            ] === answer.id
                                                        }
                                                        onChange={() =>
                                                            handleAnswerChange(
                                                                currentQuestionIndex,
                                                                answer.id
                                                            )
                                                        }
                                                        disabled={submitted}
                                                        className="mr-4 accent-blue-600"
                                                    />
                                                    <span className="text-lg font-medium text-gray-800">
                                                        {answer.answer_text}
                                                    </span>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={goToPreviousQuestion}
                                    className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105 disabled:opacity-50"
                                    disabled={currentQuestionIndex === 0}
                                >
                                    Previous
                                </button>
                                {currentQuestionIndex ===
                                questions.length - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105"
                                    >
                                        Submit Quiz
                                    </button>
                                ) : (
                                    <button
                                        onClick={goToNextQuestion}
                                        className="bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <h1 className="text-2xl font-semibold text-white mb-4 text-center">
                            No questions available for this quiz.
                        </h1>
                    )}

                    {submitted && (
                        <div className="mt-6 text-center text-white">
                            <p className="text-2xl font-bold">
                                Your Score: {score} / {questions.length}
                            </p>
                            <button
                                onClick={() => navigate("/PlayQuiz")}
                                className="mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition-all hover:scale-105"
                            >
                                Go Back to Quizzes
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <h1 className="text-2xl font-semibold text-white mb-4 text-center">
                    Loading quiz...
                </h1>
            )}
        </div>
    );
};

export default QuizDetail;
