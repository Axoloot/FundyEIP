import instance from './axios.config';

export const searchProjectName = async(projectName) => {
  const response = await instance.get(`associations?q=${projectName}`);
  return response;
}

export const searchProjectTag = async(tag) => {
  const response = await instance.get(`associations?Tag=${tag}`);
  return response;
}
