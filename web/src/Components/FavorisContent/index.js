import { useState, useEffect } from 'react';

// import { useTranslation } from 'react-i18next'; TODO Add translation

import { GetAllProject } from '../../api/project';
import { getMyUser } from '../../api/user';

import { TopProject } from '../TopProject/index';
import { RecommandationProject } from '../RecommandationProject/index';
import { TagCard } from '../TagCard';

import { Grid } from '@material-ui/core';

import {
  MainContainer,
  LoadingText,
  ExplorationContainer,
  RecommandationText,
  RecommandationRow,
  CategorieRow
} from './style'

const FavorisContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      const response = await getMyUser();
      setUser(response);

    };
    fetchData();
    setLoading(false);
  }, []);

  return (
    <MainContainer>
      {!loading && projects.length > 0 && (
        <>
          <h1>Bonjour</h1>
        </>
      )}
      {loading && (
        <>
          <LoadingText>Loading...</LoadingText>
        </>
      )}
    </MainContainer>
  );
};

export default FavorisContent;
