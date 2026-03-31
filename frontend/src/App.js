
import React, {useState, useEffect} from "react";
import { Routes, Route, Link, Navigate, useLocation} from "react-router-dom";
import AuthService from "./services/auth-service";
import Login from "./components/Login"
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Favourites from "./components/Favourites";

function App(){
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() =>{
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);

        }
    },[]);

    const logOut = () =>{
        AuthService.logout()
        setCurrentUser(null);
        alert("You will be logged out now")
    }

    const handleLogin = (user) => {
        setCurrentUser(user);
    }

    return(
        <div>
            <nav className="navbar-section">
                <div className="navbar-container">
                    <div class="app-header">
                        <h1> Buyer Portal App </h1>
                    </div>

                    <ul className="navbar">
                    {currentUser ? (
                        <>
                        <li><Link to={"/dashboard"} className="nav-link">Dashboard</Link></li>
                        <li><Link to={"/favourites"} className="nav-link">Favourites</Link></li>
                        <li><a href="/login" onClick={logOut} className="nav-link">Logout</a></li>
                        </>
                    ) : (
                        <>
                        {currentPath === "/login" && (
                            <li><Link to={"/register"} className="nav-link">Register</Link></li>
                        )}
                        {currentPath === "/register" && (
                            <li><Link to={"/login"} className="nav-link">Login</Link></li>
                        )}
                    
                        </>
                    )}
                    </ul>
                </div>
            </nav>

            <div className="main-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />

                        <Route 
                        path="/dashboard" 
                        element= {currentUser ? (
                            <div className="dashboard-container">
                                <Dashboard/>
                            </div>
                        ):(
                            <Navigate to="/login" />
                        )} />

                        <Route 
                        path="/favourites" 
                        element= {currentUser ? (
                            <div className="favourite-container">
                                <Favourites/> 
                            </div>
                        ):(
                            <Navigate to="/login" />
                        )} />

                        <Route 
                        path="/login" 
                        element={
                            <div className="login-container">
                                <Login onLogin={handleLogin}/>
                            </div>    
                        } />


                        <Route 
                        path="/register" 
                        element={
                            <div className="register-container">
                                <Register/>
                            </div>
                        } />
                    </Routes>
            </div>
            
        </div>
    )
}

export default App;