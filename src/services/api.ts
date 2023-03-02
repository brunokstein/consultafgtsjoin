import axios from 'axios';
import { AppError } from '@utils/AppError';

const token = '$2a$12$fxHm24lyx8pnZwNU0zobqeY1CcU/Ft0KYjCZpqwiozpzCrAHwUfae'

const api = axios.create({
    baseURL: 'http://api.center.joinads.me/api/api-center',
    headers: {
     'Authorization' :`Bearer ${token}`,
     'Content-Type': 'application/json',
    },
});

/* api.interceptors.response.use(
    (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
); */

export { api };