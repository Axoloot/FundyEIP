import instance from './axios.config';

export const GetBankList = async() => {
  const response = await instance.get(`nordigen/banks`);
  return response.data;
}

export const GetBankLink = async ({institutionId}) => {
  const response = await instance.get(`nordigen/institution-link?institutionId=${institutionId}&redirectUrl=https://fundy.cf/EditProfil`);
  return response.data;
}

export const PostBankCount = async({ref}) => {
  const response = await instance.post(`/nordigen/institution-validation?ref=${ref}`);
  return response.data;
}

export const GetAccountList = async() => {
  const response = await instance.get(`users/me/linked-accounts`);
  return response.data;
}

export const EnableAccount = async(id) => {
  const response = await instance.put(`users/me/linked-accounts/${id}/active`);
  return response.data;
}

export const DisableAccount = async(id) => {
  const response = await instance.put(`users/me/linked-accounts/${id}/disable`);
  return response.data;
}

export const getUserTransaction = async() => {
  const response = await instance.get('/users/me/transactions');
  return response.data;
}

export const getUserDonation = async() => {
  const response = await instance.get('/users/me/donations');
  return response.data;
}
