import api from "./axios.config";

export const GetAllAssociations = async() => {
  const resp = await api.get("associations");
  return resp.data;
}

export const GetAssociationDetails = async ({ id }) => {
  const resp = await api.get(`associations/${id}`);
  return resp.data;
}

export const GetTrendingAssociations = async() => {
  const resp = await api.get("associations/trending");
  return resp.data;
}

export const Donate = async ({id, amount}) => {
  const response = await api.post(`users/me/donate/associations/${id}`, { amount: parseFloat(amount) });
  return response.data;
}

export const LikeAssociation = async ({id}) => {
  const response = await api.post(`users/me/follow-association/${id}`);
  return response.data;
}

export const UnlikeAssociation = async ({id}) => {
  const response = await api.delete(`users/me/unfollow-association/${id}`);
  return response.data;
}

export const GetRelatedAssociations = async () => {
  const resp = await api.get("associations/trending");
  return resp.data;
}

export const GetCardPaymentLink = async ({id, amount, successUrl, cancelUrl}) => {
  const resp = await api.post(`users/me/donate/payment-link/associations/${id}`, { amount: parseInt(amount), successUrl, cancelUrl });
  return resp.data;
}