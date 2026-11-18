import instance from './axios.config';

export const GetAllProject = async() => {
  const response = await instance.get(`projects`);
  return response.data;
}

export const GetProjectDetail = async ({id}) => {
  const response = await instance.get(`projects/${id}`);
  return response.data;
}

export const LikeProject = async ({id}) => {
  const response = await instance.post(`users/me/follow-project/${id}`);
  return response.data;
}

export const UnlikeProject = async ({id}) => {
  const response = await instance.delete(`users/me/unfollow-project/${id}`);
  return response.data;
}

export const Donate = async ({projectId, amount}) => {
  const response = await instance.post(`users/me/donate/projects/${projectId}`, { amount: parseFloat(amount) });
  return response.data;
}

export const GetTrendingProject = async () => {
  const response = await instance.get(`projects/trending`);
  return response.data;
}

export const GetCardPaymentLink = async ({id, amount, successUrl, cancelUrl}) => {
  const resp = await instance.post(`users/me/donate/payment-link/projects/${id}`, { amount: parseFloat(amount), successUrl, cancelUrl });
  return resp.data;
}