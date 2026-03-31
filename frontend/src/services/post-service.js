import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api";

const getAllProperty = () =>{
    return axios.get(API_URL + "/dashboard/", {headers: authHeader()});
}

const getFavourites = () =>{
    return axios.get(API_URL + "/favourites/", {headers:authHeader()});
}

const toggleFavourite = (propertyId) => {
    return axios.post(API_URL + `/${propertyId}/favourite/`, {}, {headers:authHeader()})
}


const PostService = {
    getAllProperty,
    getFavourites,
    toggleFavourite
}
export default PostService;