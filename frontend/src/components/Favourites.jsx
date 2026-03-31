// components/Favourites.js
import React, { useState, useEffect } from "react";
import PostService from "../services/post-service";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

import "../App.css"

const Favourites = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        PostService.getFavourites().then(
            (res) => setProperties(res.data.data),
            (err) => {
                console.log(err);
                if (err.response && err.response.status === 403) {
                    AuthService.logout();
                    navigate("/login");
                }
            }
        );
    }, [navigate]);

    const handleToggle = (id) => {
        PostService.toggleFavourite(id).then(() => {
            setProperties((prev) => prev.filter((prop) => prop.id !== id));
        });
    };

    return (
        <div className="dashboard-container">
        <h3>Your Favourites</h3>
        {properties.length === 0 && <p>No favourites yet.</p>}

        <div className="property-grid">
            {properties.map((prop) => (
            <div key={prop.id} className="property-card">
                <div className="property-image">
                <span>No Image</span>
                </div>
                <div className="property-details">
                <h4>{prop.title}</h4>
                <p>Price: {prop.price}</p>
                <button onClick={() => handleToggle(prop.id)} className="unfavourite-btn">
                    ❤️ Unfavourite
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Favourites;