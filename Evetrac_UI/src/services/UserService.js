import axios from "axios";

const BASE_URL = "http://localhost:9090";

class UserService {
  createUser(userDetails) {
    return axios.post(`${BASE_URL}/registerasuser`, userDetails);
  }

  loginUser(userLoginDetails) {
    console.log(userLoginDetails);
    return axios.post(`${BASE_URL}/login`, userLoginDetails);
  }

  updateProfile(newProfDetails) {
    return axios.put(`${BASE_URL}/updateProfile`, newProfDetails);
  }

  userDetails(userId){
    return axios.get(`${BASE_URL}/userByUserId?userId=${userId}`);
  }

  addToWishlist(userId,eventId){
    return axios.get(`${BASE_URL}/addToWishlist?userId=${userId}&eventId=${eventId}`);
  }

  removeFromWishlist(userId,eventId){
    return axios.get(`${BASE_URL}/removeFromWishlist?userId=${userId}&eventId=${eventId}`);
  }
}

export default new UserService();
