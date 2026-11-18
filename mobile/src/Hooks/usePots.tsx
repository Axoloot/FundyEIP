//
// UNUSED
//
import axios from 'axios';
import { useCallback } from 'react';
import config from '../config';
import { Pot } from './types';

interface PotsType {
  getPots: () => Promise<Pot | undefined>;
  getPotFromProjectId: (id: string) => Promise<Pot | undefined>;
  getPotsFromAssociationId: (id: string) => Promise<Pot | undefined>;
}

const usePots = (): PotsType => {
  const getPots = useCallback(async (): Promise<Pot | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/pots`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, []);

  const getPotFromProjectId = useCallback(async (id: string): Promise<Pot | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/pot/projects/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, []);

  const getPotsFromAssociationId = useCallback(async (id: string): Promise<Pot | undefined> => {
    try {
      const { data } = await axios.get(`${config.BACKEND_HOST}/pots/associations/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, []);

  return {
    getPots,
    getPotFromProjectId,
    getPotsFromAssociationId,
  };
};

export default usePots;
