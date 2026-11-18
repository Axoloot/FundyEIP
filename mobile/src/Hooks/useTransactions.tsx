import axios from 'axios';
import { useCallback } from 'react';
import config from '../config';
import { Transaction } from './types';

interface TransactionType {
  getTransactions: () => Promise<Transaction[]>;
}

const useTransactions = (): TransactionType => {
  const getTransactions = useCallback(async (): Promise<Transaction[]> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/users/me/transactions`);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  return {
    getTransactions,
  };
};

export default useTransactions;
