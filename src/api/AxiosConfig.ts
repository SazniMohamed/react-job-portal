import axios from "axios";

const AxiosConfig = axios.create({
    baseURL: "http://localhost:8000"
});

export default AxiosConfig;
