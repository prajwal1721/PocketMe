import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
});
// instance.defaults.headers = {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//     'Expires': '0',
// };

export default instance;