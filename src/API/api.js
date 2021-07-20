import axios from "axios";


const api = axios.create({
    baseURL: "https://apitestelogin.herokuapp.com/",
  });

export default api;