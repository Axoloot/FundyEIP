/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import i18n from 'i18next';
import React, {
  createContext,
  useCallback,
  useState,
} from 'react';

import config from '../config';
import { LinkedBank } from '../Hooks/types';
// import * as Analytics from 'expo-firebase-analytics';
import { Donation, Project } from './ProjectContext';
import { Association } from './AssociationsContext';

export interface ModifyUser {
  email?: string;
  firstname?: string;
  lastname?: string;
  lang?: string;
  password?: string;
  profilePicture?: string;
  darkmode?: boolean;
  roundedTo?: number;
  edited: boolean;
}

export type User = {
  id: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  piggyBank: number;
  isVerified: boolean;
  bankAccounts: LinkedBank[];
  deviceNotificationToken: string | null;
  FollowedProjects: Project[];
  FollowedAssociation: Association[];
  lang: string;
  profilePicture: string;
  darkmode?: boolean;
  roundedTo: number;
  updatedAt: Date;
  createdAt: Date;
  Donations: Donation[];
};

export interface SigninArgs {
  email: string;
  password: string;
}
export interface ForgotArgs {
  email: string;
}

interface SignupArgs extends SigninArgs {
  firstname: string;
  lastname: string;
  lang: string,
}

interface AuthValues {
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  isLoading: boolean,
  signin: (arg0: SigninArgs) => Promise<boolean>,
  signup: (body: SignupArgs) => Promise<boolean>,
  signout: () => Promise<void>,
  getUser: () => Promise<boolean | Record<string, unknown>>,
  forgotpassword: (arg0: ForgotArgs) => Promise<null | Record<string, unknown>>,
  editUser: (newInfo: ModifyUser) => Promise<void>;

}

export const AuthContext = createContext<AuthValues>({} as AuthValues);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [signedIn, SetIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const forgotpassword = useCallback(async (
    { email }: ForgotArgs): Promise<null | Record<string, unknown>> => {
    try {
      const { data } = await axios.post(
        `${config.BACKEND_HOST}/auth/forgot-password`,
        { email },
        { withCredentials: true },
      );

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const signin = useCallback(async (
    { email, password }: SigninArgs): Promise<boolean> => {
    try {
      const { data } = await axios.post(`${config.BACKEND_HOST}/auth/signin`, { email, password },
        { withCredentials: true },
      );
      setUser(data);
      // SetIsSignedIn(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const editUser = useCallback(async (newInfo: ModifyUser): Promise<void> => {
    try {
      if (!user) return;
      const { data: newUser } = await axios.patch<User>(`${config.BACKEND_HOST}/users/me`,
        { withCredentials: true, ...newInfo });
      setUser({
        ...user,
        ...newUser,
      });
      i18n.changeLanguage(newUser.lang);
    } catch (error) { console.error(error); }
  }, [user]);

  const signup = useCallback(async (body: SignupArgs): Promise<boolean> => {
    try {
      await axios.post(`${config.BACKEND_HOST}/auth/signup`, body);
      const { email, password } = body;
      await signin({ email, password });
      if (body.lang !== undefined) {
        await editUser({ edited: true, lang: body.lang });
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [signin, editUser]);

  const signout = useCallback(async (): Promise<void> => {
    try {
      await axios.delete(`${config.BACKEND_HOST}/auth/signout`);
      setUser(undefined);
      // SetIsSignedIn(false);
      await AsyncStorage.multiRemove(['email', 'password']);
    } catch (error) { console.error(error); }
  }, []);

  const getUser = useCallback(async (): Promise<boolean | Record<string, unknown>> => {
    try {
      const { data } = await axios.get<User>(`${config.BACKEND_HOST}/users/me`, {
        withCredentials: true,
      });
      setUser(data);
      // await Analytics.setUserId(data.id);
      if (isLoading) i18n.changeLanguage(data.lang);
      return data;
    } catch (error) {
      console.error(error);
      setUser(undefined);
      return false;
    }
  }, [isLoading]);

  // useEffect(() => {
  // if (signedIn) {
  //   getUser()
  //     .then(() => setIsLoading(false))
  //     .catch(() => setIsLoading(false));
  // }
  // }, [getUser, signedIn]);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isLoading,
      signin,
      signup,
      signout,
      getUser,
      forgotpassword,
      editUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
