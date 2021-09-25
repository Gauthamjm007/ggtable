import axios from "axios";

var axiosInstance = axios.create();
let baseURL = "http://go-dev.greedygame.com/v3/dummy/";
axiosInstance.defaults.baseURL = `${baseURL}`;

export default axiosInstance;
