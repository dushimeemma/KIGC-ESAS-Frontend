import axios from 'axios';

const token = localStorage.getItem('token');
const url =
  process.env.REACT_APP_BACK_URL || 'https://kigc-esas.herokuapp.com/';

const setAxios = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
});

export default setAxios;
