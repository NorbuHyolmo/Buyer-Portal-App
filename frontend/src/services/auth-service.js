import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

const register = (email, password, password2) =>{
    return axios.post(API_URL + "/register/", {
        email,
        password,
        password2
    })
.then(response =>{
    if(response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data; 
    })
};


const login = (email, password) =>{
    return axios.post(API_URL + "/login/", {
        email,
        password
    })
.then(response =>{
    if(response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data; 
    })
};


const logout = () =>{
    localStorage.removeItem("user");
}

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
}

export default AuthService;