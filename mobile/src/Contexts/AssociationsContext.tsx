import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import config from '../config';
import { AuthContext } from './AuthContext';

interface Action {
  id: string,
  title: string,
  description: string,
  associationId: string,
}

interface Donation {
  amount:number,
  associationId: string,
  id: string,
  projectId: string, 
  userId: string,
}

export type Association = {
  id: string
  email: string
  name: string
  title: string
  isVerified: boolean
  description: string
  raisedCurrently: number
  image: string
  updatedAt: Date
  createdAt: Date
  tags: string[]
  latitude: number
  longitude: number
  userId: string | null
  Donations: Donation[]
  Actions: Action[]
};

export type NewAssociation = {
  email: string
  name: string
  description: string
  image: string;
  title: string;
  longitude: number;
  latitude: number;
};

interface AssociationsContextProviderProps {
  children: React.ReactNode
}

interface StripeReturn { paymentIntent: string, ephemeralKey:string, customer:string }
interface AssociationValues {
  associations: Association[],
  getAssociation: () => Promise<void>;
  getTrending: () => Promise<Association[] | undefined>;
  createAssociation: (body: NewAssociation) => Promise<void>;
  getAssociationFromId: (id: string) => Promise<Association | undefined>;
  followAssociation: (AssosId: string) => Promise<Association[]>;
  unfollowAssociation: (AssosId: string) => Promise<Association[]>;
  donate: (assosId: string, amount: number) => Promise<Association | undefined>;
  donateWithStripeAsso : (projectId: string, amount: number) => Promise<StripeReturn | undefined> ;
}

export const AssociationContext = createContext<AssociationValues>({} as AssociationValues);

export const AssociationContextProvider = (props: AssociationsContextProviderProps)
: JSX.Element => {
  const { children } = props;
  const [associations, setAssociations] = useState<Association[]>([]);
  const { getUser } = useContext(AuthContext);

  const getAssociation = useCallback(async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/associations`);
      setAssociations(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createAssociation = useCallback(async (body: NewAssociation): Promise<void> => {
    await axios.post(`${config.BACKEND_HOST}/associations`, body);
  }, []);

  const getAssociationFromId = useCallback(async (id: string): Promise<Association | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/associations/${id}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }, []);

  const followAssociation = useCallback(async (assosId: string): Promise<Association[]> => {
    try {
      const { data: FollowedAssociationss } = await axios.post<Association[]>(`${config.BACKEND_HOST}/users/me/follow-association/${assosId}`);
      await getUser();
      return FollowedAssociationss;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [getUser]);

  const unfollowAssociation = useCallback(async (assosId: string): Promise<Association[]> => {
    try {
      const { data: FollowedAssociationss } = await axios.delete(`${config.BACKEND_HOST}/users/me/unfollow-association/${assosId}`);
      await getUser();
      return FollowedAssociationss;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [getUser]);

  const donate = useCallback(async (assosId: string, amount: number)
  : Promise<Association | undefined> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/users/me/donate/associations/${assosId}`, { amount });
      await getUser();
      await getAssociation();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [getUser, getAssociation]);

  const donateWithStripeAsso = useCallback(async (projectId: string, amount: number)
  : Promise<StripeReturn | undefined> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/users/me/donate/payment-sheet/associations/${projectId}`, { amount });
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [getAssociation]);

  const getTrending = useCallback(async (): Promise<Association[] | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/associations/trending`);
      return data.weeklyAssociations;
    } catch (error) {
      return undefined;
    }
  }, []);


  useEffect(() => { getAssociation(); }, [getAssociation]);


  return (
    <AssociationContext.Provider value={{
      donate,
      associations,
      getTrending,
      getAssociation,
      followAssociation,
      unfollowAssociation,
      createAssociation,
      donateWithStripeAsso,
      getAssociationFromId,
    }}
    >
      {children}
    </AssociationContext.Provider>
  );
};
