import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

import config from '../config';
import { AuthContext } from './AuthContext';

export interface Donation {
  amount: number,
  associationId: string,
  id: string,
  projectId: string,
  userId: string,
  createdAt: Date,
}
interface Action {
  id: string,
  title: string,
  description: string,
  associationId: string,
}

export type Project = {
  id: string
  email: string
  name: string
  title: string
  isVerified: boolean
  description: string
  goal: number
  raisedPercentage: number
  raisedCurrently: number
  image: string | null
  tags: string[]
  latitude: string
  longitude: string
  updatedAt: Date
  createdAt: Date
  userId: string | null
  Donations: Donation[]
  Actions: Action[]
};

export type NewProject = {
  email: string;
  name: string;
  description: string;
  title: string;
  goal: number;
  image: string;
  longitude: string;
  latitude: string;
};

interface StripeReturn { paymentIntent: string, ephemeralKey: string, customer: string }

interface ProjectsValues {
  getProjects: () => Promise<boolean>;
  getTrending: () => Promise<Project[] | undefined>;
  createProject: (body: NewProject) => Promise<boolean>;
  getProjectFromId: (id: string) => Promise<Project | undefined>;
  followProject: (projectId: string) => Promise<boolean>;
  unfollowProject: (projectId: string) => Promise<boolean>;
  donate: (projectId: string, amount: number) => Promise<Project | undefined>;
  donateWithStripeProject: (projectId: string, amount: number) => Promise<StripeReturn | undefined>;
  projects: Project[];
}

interface ProjectsContextProviderProps {
  children: React.ReactNode
}

export const ProjectsContext = createContext<ProjectsValues>({} as ProjectsValues);

export const ProjectsContextProvider = (props: ProjectsContextProviderProps): JSX.Element => {
  const { getUser } = useContext(AuthContext);
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const { children } = props;

  const getProjects = useCallback(async (): Promise<boolean> => {
    try {
      const { data } = await axios.get<Project[]>(`${config.BACKEND_HOST}/projects`);
      setProjects(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const createProject = useCallback(async (body: NewProject): Promise<boolean> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/projects`, body);
      setProjects((old) => [...old, data]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const getProjectFromId = useCallback(async (id: string): Promise<Project | undefined> => {
    try {
      const { data } = await axios.get<Project>(`${config.BACKEND_HOST}/projects/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, []);

  const followProject = useCallback(async (projectId: string): Promise<boolean> => {
    try {
      await axios.post<Project[]>(`${config.BACKEND_HOST}/users/me/follow-project/${projectId}`);
      await getUser();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [getUser]);

  const unfollowProject = useCallback(async (projectId: string): Promise<boolean> => {
    try {
      await axios.delete(`${config.BACKEND_HOST}/users/me/unfollow-project/${projectId}`);
      await getUser();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [getUser]);

  const donate = useCallback(async (projectId: string, amount: number)
    : Promise<Project | undefined> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/users/me/donate/projects/${projectId}`, { amount: amount });
      await getUser();
      await getProjects();
      Alert.alert('Merci pour votre don', "Le montant à été prélevé sur vôtre cagnotte");
      return data;
    } catch (error) {
      console.error(error);
      Alert.alert('Une erreur est survenue', "Votre don n'a pas été effectué");
      return undefined;
    }
  }, [getUser, getProjects]);

  const donateWithStripeProject = useCallback(async (projectId: string, amount: number)
    : Promise<StripeReturn | undefined> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/users/me/donate/payment-sheet/projects/${projectId}`, { amount });
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [getProjects]);

  const getTrending = useCallback(async (): Promise<Project[] | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/projects/trending`);
      return data.weeklyProjects;
    } catch (error) {
      return undefined;
    }
  }, []);


  useEffect(() => { getProjects(); }, [getProjects]);

  return (
    <ProjectsContext.Provider value={{
      getProjects,
      getTrending,
      donateWithStripeProject,
      createProject,
      getProjectFromId,
      followProject,
      unfollowProject,
      donate,
      projects,
    }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
