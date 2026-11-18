import React, { useState, useEffect } from 'react';

import {
  BodyContainer,
} from './style';

import ProjectsContent from './ProjectsContent';
import FavorisContent from '../../Components/FavorisContent';

import { getMyUser } from '../../api/user';

const Projects = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const Tabs = [
    { content: <ProjectsContent />},
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
        </>
      )}
    </BodyContainer>
  );
}

export default Projects;
