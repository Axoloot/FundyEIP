import axios from 'axios';
import {
  useCallback,
  useContext,
  useState,
} from 'react';
import config from '../config';
import { AuthContext } from '../Contexts/AuthContext';
import { Bank } from './types';

interface NordigenType {
  getBanks: () => Promise<void>;
  saveBankRef: (ref: string) => Promise<void>;
  getBankLink: (
    institutionId: string,
    callback: React.Dispatch<React.SetStateAction<Bank | undefined>>
  ) => Promise<void>;
  toggleRounding: (
    infos: string,
    callback: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  deleteAccount: (accountId: string) => Promise<void>;
  loading: boolean;
  banks: Bank[] | undefined;
  redirectUrl: string;
}

const useNordigen = (): NordigenType => {
  const [banks, setBanks] = useState<Bank[] | undefined>();
  const [loading, setLoading] = useState(true);
  const redirectUrl = 'https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif';
  const { getUser } = useContext(AuthContext);

  const getBanks = useCallback(async () => {
    const { data } = await axios.get(`${config.BACKEND_HOST}/nordigen/banks`);
    setBanks(data);
    setLoading(false);
  }, []);

  const getBankLink = useCallback(async (institutionId, callback) => {
    const { data } = await axios.get(`${config.BACKEND_HOST}/nordigen/institution-link?institutionId=${institutionId}&redirectUrl=${redirectUrl}`);
    callback(data);
  }, []);

  const saveBankRef = useCallback(async (ref) => {
    await axios.post(`${config.BACKEND_HOST}/nordigen/institution-validation?ref=${ref}`);
    getUser();
  }, [getUser]);

  const toggleRounding = useCallback(async (infos, callback): Promise<void> => {
    callback((previousState: boolean) => !previousState);
    await axios.put(`${config.BACKEND_HOST}/users/me/linked-accounts/${infos}`);
  }, []);

  const deleteAccount = useCallback(async (id) => {
    await axios.delete(`${config.BACKEND_HOST}/users/me/linked-accounts/${id}`);
  }, []);

  return {
    getBanks,
    getBankLink,
    saveBankRef,
    toggleRounding,
    deleteAccount,
    loading,
    banks,
    redirectUrl,
  };
};

export default useNordigen;
