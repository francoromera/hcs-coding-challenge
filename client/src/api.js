import axios from 'axios';
import routes from './routes';
import history from './history';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.response.use(response => response, async error => {
  if (error && error.response && error.response.status === 401) {
    logout();
    history.push(routes.main);
  }
  return Promise.reject(error);
});

export const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem('user'));
};

export const register = async (username, password, password2) => {
  const response = await axios.post('/user', {
    username,
    password,
    password2
  });
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post('/auth/login', {
    username,
    password
  });
  window.sessionStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

export const logout = async () => {
  window.sessionStorage.removeItem('user');
  await axios.post('/auth/logout');
};

export const getTasks = async () => {
  const response = await axios.get('/task');
  return response.data;
};

export const addTask = async task => {
  const response = await axios.post('/task', task);
  return response.data;
};

export const editTask = async task => {
  const response = await axios.put(`/task/${task._id}`, task);
  return response.data;
};

export const deleteTask = async id => {
  const response = await axios.delete(`/task/${id}`);
  return response.data;
};
