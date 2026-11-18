import axios from "axios";

const requester = axios.create();
requester.defaults.withCredentials = true
requester.defaults.baseURL = process.env.API_URL || 'http://localhost:8000/';

// Static portfolio build: answer every request in the browser with fake data.
// DEMO_MODE is replaced at build time, so the mock is dropped from normal builds.
if (process.env.DEMO_MODE === 'true') {
  requester.defaults.adapter = require('./mock/adapter').default;
}

export default requester;
