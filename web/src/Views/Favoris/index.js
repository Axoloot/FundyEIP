import { useState, useEffect } from 'react';

// import { useTranslation } from 'react-i18next'; TODO Add translation

import { getMyUser } from '../../api/user';

import { RecommandationProject } from '../../Components/RecommandationProject/index';
import { RecommandationAssos } from '../../Components/RecommandationAssos';

import { Grid } from '@material-ui/core';

import {
  Title,
  BodyContainer,
  Content
} from "../../Components/UI/Content";
import {
  LoadingText,
  RecommandationText,
  NoContent
} from './style';

const Favoris = () => {
  // const { t } = useTranslation();  TODO Add translation
  const [projects, setProjects] = useState([]);
  const [ associations, setAssociations ] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      const userTmp = await getMyUser();
      setProjects(userTmp.FollowedProjects);
      setAssociations(userTmp.FollowedAssociation);
      setUser(userTmp);
    };
    fetchData();

    setLoading(false);
  }, []);

  return (
    <BodyContainer>
      {!loading && projects.length > 0 && (
        <>
          <Title>
            Projets Favoris
          </Title>
          <Content margin="40px 0 0 0">
            <Grid container spacing={2}>
              {projects.map((project) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                    <RecommandationProject data={project}/>
                  </Grid>
                )
              })}
            </Grid>
          </Content>
        </>
      )}
      {!loading && associations.length > 0 && (
        <>
          <Title margin="40px 0 0 0" style={{ marginTop: 50 }}>
            Associations Favoris
          </Title>
          <Content margin="40px 0 0 0">
            <Grid container spacing={2}>
              {associations.map((association) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={association.id}>
                    <RecommandationAssos data={association}/>
                  </Grid>
                )
              })}
            </Grid>
          </Content>
        </>
      )}
      {!loading && projects.length === 0 && associations.length === 0 && (
        <>
          <LoadingText>
            <NoContent>No Content...</NoContent>
          </LoadingText>
        </>
      )}
      {loading && (
        <>
          <LoadingText>Loading...</LoadingText>
        </>
      )}
    </BodyContainer>
  );
};

export default Favoris;
