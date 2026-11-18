import axios from "axios";

const requester = axios.create();
requester.defaults.withCredentials = true
requester.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/';

export default requester;
