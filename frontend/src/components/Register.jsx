import React, { useState } from "react";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register(email, password, password2);
            console.log("Registration successful:", response);
            navigate("/login"); // redirect without reload
        } catch (err) {
            console.log("Registration error:", err.response ? err.response.data : err.message);
            }
        }
    
    return(
        <div className="login-section">
            <form onSubmit={handleRegister} className="login-container">
                <div className="login-header">
                    <h3> SIGN UP </h3>
                    <p> Sign up with email </p>
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}/>
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>
        </div>
    )
};

export default Register;