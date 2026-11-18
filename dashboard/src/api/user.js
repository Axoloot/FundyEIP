import instance from './axios.config';

export const getMyUser = async() => {
  const response = await instance.get(`/users/me`);
  return response.data;
}

export const LogIn = async ({ email, password }) => {
  const response = await instance.post(`/auth/signin`, { email, password });
  return response;
}

export const Register = async ({ email, password, firstname, lastname }) => {
  const response = await instance.post(`/auth/signup`, { email, password, firstname, lastname });
  return response;
}

export const EditMyuser = async (data) => {
  const response = await instance.patch(`/users/me`, data);
  return response;
}
