import axios from 'axios';

// json-server server.json --host 192.168.0.114 --port 3333 --delay 700

const api = axios.create({
  baseURL: 'http://192.168.0.114:3333',
}); 

export default api;