import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";
import "../App.css"

const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await AuthService.login(email, password);
        if (response.accessToken){
            onLogin(response)
        }
        navigate("/dashboard");

    } catch (error) {
        console.log("Login failed:", error.response?.data?.message);
        alert("Invalid Email or Password!")
        }
    };
    
    return(
        <div className="login-section">
            <form onSubmit={handleLogin} className="login-container">
                <div className="login-header">
                    <h3> LOGIN </h3>
                    <p> Sign in with email</p>
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
};
        
export default Login;