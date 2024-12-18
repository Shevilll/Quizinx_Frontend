import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PlayQuiz from "./pages/PlayQuiz";
import Home from "./pages/Home";
import QuizDetail from "./pages/QuizDetail";

function NotFound() {
    return <h1 className="text-red-500">404: Page Not Found</h1>;
}

// Main App Component
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PlayQuiz" element={<PlayQuiz />} />
                <Route path="/quiz/:quiz_id" element={<QuizDetail />} />{" "}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
