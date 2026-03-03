# Coding Platform - Frontend

This is the frontend for the Coding Platform application, built with **React** + **Vite**.

## 📂 Project Structure

The project follows a modular and scalable structure. Here is the complete file organization:

```
src/
├── api/                    # API integration
│   ├── axiosInstance.js    # Axios configuration
│   ├── auth.api.js         # Authentication endpoints
│   ├── user.api.js         # User related endpoints
│   └── problem.api.js      # Problem related endpoints
│
├── assets/                 # Static assets
│   ├── logo.png
│   └── hero.svg
│
├── components/             # Reusable UI components
│   ├── common/             # Global components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Loader.jsx
│   │
│   ├── problem/            # Problem-specific components
│   │   ├── ProblemCard.jsx
│   │   ├── CodeEditor.jsx
│   │   └── TestCaseViewer.jsx
│   │
│   └── admin/              # Admin dashboard components
│       ├── AdminSidebar.jsx
│       └── AdminHeader.jsx
│
├── context/                # Global state management
│   ├── AuthContext.jsx     # Authentication state
│   └── UserContext.jsx     # User data state
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication hook
│   └── useFetch.js         # Data fetching hook
│
├── pages/                  # Application pages
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── user/
│   │   ├── Dashboard.jsx
│   │   └── Profile.jsx
│   │
│   ├── problems/
│   │   └── ProblemList.jsx
│   │
│   └── Home.jsx            # Landing page
│
├── routes/                 # Routing configuration
│   └── AppRoutes.jsx
│
├── styles/                 # Global styles
│   └── index.css
│
├── utils/                  # Helper functions
│   ├── constants.js
│   └── validators.js
│
├── App.jsx                 # Main App component
└── main.jsx                # Entry point
```

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
