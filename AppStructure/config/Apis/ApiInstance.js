import axios from "axios";

const ApiInstance = axios.create({
    baseURL: 'https://megamart-backend.vercel.app',
    headers: {
        "Content-Type": "application/json",
    }
});

export default ApiInstance;
