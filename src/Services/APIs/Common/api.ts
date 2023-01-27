import axios from "axios";

const ApiConn = axios.create({
  baseURL: process?.env?.BASE_URL || 'https://fiap-reactjs-presencial.herokuapp.com',
});

export default ApiConn;
