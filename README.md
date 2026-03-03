# Coding Platform

A full-stack coding platform application.

## 📂 Project Structure

### 1. Backend (`/Backend`)
Node.js/Express API structure:
```
src/
├── config/
│   ├── db.js
│   └── redis.js
├── controllers/
│   ├── userAuthent.js
│   ├── userProblem.js
│   └── userSubmission.js
├── middleware/
│   ├── adminMiddleware.js
│   └── userMiddleware.js
├── models/
│   ├── problem.js
│   ├── submission.js
│   └── user.js
├── routes/
│   ├── problemCreator.js
│   ├── submit.js
│   └── userAuth.js
├── utils/
│   ├── problemUtility.js
│   └── validator.js
└── index.js
```

### 2. Frontend (`/Frontend`)
React + Vite application structure:
```
src/
├── api/                    # API services
│   ├── axiosInstance.js
│   ├── auth.api.js
│   ├── user.api.js
│   └── problem.api.js
│
├── components/             # Reusable UI components
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   ├── problem/
│   │   ├── ProblemCard.jsx
│   │   ├── CodeEditor.jsx
│   │   └── TestCaseViewer.jsx
│   └── admin/
│       ├── AdminSidebar.jsx
│       └── AdminHeader.jsx
│
├── pages/                  # Application views
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── user/
│   │   ├── Dashboard.jsx
│   │   └── Profile.jsx
│   ├── problems/
│   │   └── ProblemList.jsx
│   └── Home.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── UserContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useFetch.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── styles/
│   └── index.css
│
└── utils/
    ├── constants.js
    └── validators.js
```

## 🚀 Getting Started

### Backend Setup
```bash
cd Backend
npm install
npm start
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
