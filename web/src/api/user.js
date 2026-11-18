import instance from './axios.config';

export const getMyUser = async() => {
  const response = await instance.get(`users/me`);
  return response.data;
}

export const Login = async ({ email, password }) => {
  const response = await instance.post(`auth/signin`, { email, password });
  return response;
}

export const Register = async ({ email, password, firstname, lastname }) => {
  const response = await instance.post(`auth/signup`, { email, password, firstname, lastname });
  return response;
}

export const EditMyuser = async ({email, password, lang, firstname, lastname, roundedTo, profilePicture}) => {
  const response = await instance.patch(`/users/me/`, {email, password, lang, firstname, lastname, roundedTo, profilePicture});
  return response;
}

export const forgotPassword = async ({ email }) => {
  const response = await instance.post(`auth/forgot-password`, { email });
  return response;
}

export const resetPassword = async ({ token, password }) => {
  const response = await instance.post(`auth/reset-password`, { token, password });
  return response;
}

export const Logout = async () => {
  const response = await instance.delete(`auth/signout`);
  return response;
};

export const updatePicture = async(picture) => {
  const response = await instance.patch(`users/me/profile-picture`, {picture});
  return response;
}
