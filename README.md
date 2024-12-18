# Quiz Application

This is a full-stack quiz application with a Django backend and React frontend. The backend handles quiz data and scoring, while the frontend provides a user-friendly interface to interact with the quizzes.

## Frontend Setup (React)

### Prerequisites

-   Node.js (version 16+ recommended)

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Shevilll/Quizinx_Frontend
    cd Quizinx_Frontend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm start
    ```

---

## API Endpoints

-   **GET /api/v1/quiz/<quiz_id>/**: Retrieve a specific quiz by its ID.
-   **GET /api/v1/quizquestions/<quiz_id>/**: Retrieve questions for a specific quiz.
-   **POST /api/v1/submit_quiz/**: Submit answers to the quiz and get the score.

---

## Deployment

-   For deploying the frontend, I used [Vercel](https://vercel.com).

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
