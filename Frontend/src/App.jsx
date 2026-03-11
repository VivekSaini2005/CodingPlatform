import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProblemList from './pages/problems/ProblemList';
import ProblemDetail from './pages/problems/ProblemDetail';
import Contest from './pages/Contest';
import Leaderboard from './pages/Leaderboard';
import Discuss from './pages/Discuss';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import CreateProblem from "./InnerComponents/AdminPanel/CreateProblem.jsx";
import AdminDelete from "./InnerComponents/AdminPanel/AdminDelete.jsx";
import AdminUpdate from "./InnerComponents/AdminPanel/AdminUpdate.jsx";
import AdminVideo from "./InnerComponents/AdminPanel/AdminVideo.jsx";
import Admin from "./pages/Admin.jsx";

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/themeContext.jsx';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/problems" element={<ProblemList />} />
                        <Route path="/problem" element={<ProblemList />} />
                        <Route path="/problems/:id" element={<ProblemDetail />} />
                        <Route path="/contests" element={<Contest />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/discuss" element={<Discuss />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/create" element={<CreateProblem />} />
                        <Route path="/admin/delete" element={<AdminDelete />} />
                        <Route path="/admin/update" element={<AdminUpdate />} />
                        <Route path="/admin/video" element={<AdminVideo />} />
                        {/* Add more routes here as needed */}
                    </Routes>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
