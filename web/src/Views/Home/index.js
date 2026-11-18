import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BodyContainer,
} from './style';

import HomeContent from './HomeContent';
import FavorisContent from '../../Components/FavorisContent';

import { getMyUser } from '../../api/user';

const Home = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const Tabs = [
    { content: <HomeContent />},
    { content: <FavorisContent />}
  ];

  const fetchData = async () => {
    const response = await getMyUser();
    window.localStorage.setItem('user', JSON.stringify(response));
    setUser(response);
  }

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  return (
    <BodyContainer>
      {!loading && user.firstname && (
        <>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {Tabs[tabIdx].content}
        </div>
        </>
      )}
      {loading && (
        <>
        <h1>{t('commons.loading')}</h1>
        </>
      )}
    </BodyContainer>
  );
}

export default Home;
