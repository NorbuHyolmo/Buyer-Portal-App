import React, {useState, useEffect} from "react";
import PostService from "../services/post-service";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Dashboard = () => {
    const [property, setProperty] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user){
            setCurrentUser(user)
        }
        PostService.getAllProperty().then(
            (response) => {
                console.log("Dashboard API response:", response.data);
                setProperty(response.data.data); 
            },
            (error) => {
                console.log("Error fetching properties:", error.response);
                if (error.response && error.response.status === 403) {
                    AuthService.logout();
                    navigate("/login");
                }
            }
        )
    }, [navigate]);

    const handleToggleFavourite = async (propertyId) => {
    try{
        await PostService.toggleFavourite(propertyId);

        setProperty((prev) =>
                prev.map((prop)=>
                prop.id === propertyId ?
                {...prop, is_favourited: !prop.is_favourited}
                : prop
            ))
    } catch (error){
        console.log("Toggle error:", error)
    }
}

    return (
        <div className="dashboard-container">
        <h2>
        {currentUser 
            ? `Welcome, ${currentUser.username} (${currentUser.role})`
            : "Welcome"}
        </h2>
        <div className="property-grid">
            {Array.isArray(property) && property.map((prop) => (
            <div key={prop.id} className="property-card">
                <div className="property-image">
                {prop.image ? (
                    <img src={prop.image} alt={prop.title} />
                ) : (
                    <span className="no-image-text">No Image</span>
                )}
                </div>
                <div className="property-details">
                <h4>{prop.title}</h4>
                <p>Price: {prop.price}</p>
                <p>Location: {prop.location}</p>
                <button
                    className={`favourite-btn ${prop.is_favourited ? 'favourited' : ''}`}
                    onClick={() => handleToggleFavourite(prop.id)}
                >
                    {prop.is_favourited ? "❤️ Unfavourite" : "🤍 Favourite"}
                </button>
                </div>
            </div>
            ))}
            {!Array.isArray(property) && <p>No properties found.</p>}
        </div>
        </div>
    );
};

export default Dashboard;