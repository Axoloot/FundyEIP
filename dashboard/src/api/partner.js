import instance from './axios.config';

export const createProject = async({email, name, description, title, goal, image, tags, longitude, latitude}) => {
  const response = await instance.post(`/partner/projects`, {email, name, description, title, goal, image, tags, longitude, latitude});
  return response.data;
}

export const updateProject = async(id, data) => {
  const response = await instance.patch(`/partner/projects/${id}`, data);
  return response.data;
}

export const updateActions = async(id, data) => {
  const response = await instance.patch(`/partner/actions/${id}`, data);
  return response.data;
}

export const getProjectById = async({id}) => {
  const response = await instance.get(`/partner/projects/${id}`);
  return response.data;
}

export const getProjects = async() => {
  const response = await instance.get(`/partner/projects`);
  return response.data;
}

export const createProjectAction = async(id, data) => {
  const response = await instance.post(`/partner/projects/${id}/actions`, data);
  return response.data;
}

export const createAssociationAction = async(id, data) => {
  const response = await instance.post(`/partner/associations/${id}/actions`, data);
  return response.data;
}

export const getDonations = async() => {
  const response = await instance.get(`/partner/donations`);
  return response.data;
}

export const getAssociations = async() => {
  const response = await instance.get(`/partner/associations`);
  return response.data;
}

export const getAssociationById = async({id}) => {
  const response = await instance.get(`/partner/associations/${id}`);
  return response.data;
}

export const createAssociation = async({email, name, description, image, title, longitude, latitude}) => {
  const response = await instance.post(`/partner/associations`, {email, name, description, image, title, longitude, latitude});
  return response.data;
}

export const updateAssociation = async(id, data) => {
  const response = await instance.patch(`/partner/associations/${id}`, data);
  return response.data;
}

