import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GetTrendingProject } from '../../../api/project';
import { GetTrendingAssociations } from '../../../api/association';
import { RecommandationProject } from '../../../Components/RecommandationProject';
import AssociationListingCard from '../../../Components/Associations/ListingCard';
import { Grid } from '@material-ui/core';

import {
  MainContainer,
  LoadingText,
  ExplorationContainer,
  RecommandationRow,
  StatNumber,
  StatCard,
  StatTitle,
  TitleContainer,
  StatContainer,
  LeftTitle,
  RightTitle,
  PartContainer,
  LeftDescription,
  Title,
  SubTitle,
  ColumnContainer,
  RightDescription
} from './style'

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const Stat = ({ type, cardColor, textColor, text, number, collected }) => (
  <StatContainer>
    <Title style={{ fontSize: 22, width: '70%', marginRight: '10%' }}>
      {text}
    </Title>
    <StatCard style={{ marginLeft: 'auto', backgroundColor: cardColor }}>
      <StatNumber style={{ color: 'white' }}>
        {number}
      </StatNumber>
      <StatTitle style={{ marginTop: -15, color: 'white' }}>
        {type}
      </StatTitle>
    </StatCard>
    <StatCard style={{  cardColor }}>
      <StatNumber style={{ color: textColor, paddingTop: 40 }}>
        {kFormatter(collected)}+
      </StatNumber>
      <StatTitle style={{ marginTop: -15, paddingBottom: 40, color: 'black'}}>
        Argent Récolté
      </StatTitle>
    </StatCard>
  </StatContainer>
);

const HomeContent = () => {
  const { t } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      const trending = await GetTrendingProject();
      const assoResult = await GetTrendingAssociations();
      setProjects(trending.weeklyProjects);
      setAssociations(assoResult.weeklyAssociations);
    };
    fetchData();

    setLoading(false);
  }, []);

  return (
    <MainContainer>
      {!loading && (
        <>
          <ExplorationContainer style={{ padding: 0 }}>
            {projects && associations && (
              <>
                <TitleContainer>
                  <Title>
                    {t('home.crowdfunding')}
                  </Title>
                  <Title style={{ color: '#9cbffd', paddingLeft: 10 }}>
                    {t('home.rounded')}
                  </Title>
                </TitleContainer>
                <SubTitle style={{ paddingBottom: 100 }}>
                  <p>
                    {t('home.description')}
                  </p>
                </SubTitle>
                <PartContainer style={{ backgroundColor: 'rgba(193,11,11,0.05)' }}>
                  <ColumnContainer>
                    <LeftTitle style={{ color: '#fa7f7e' }}>
                      {t('home.who_are_we')}
                    </LeftTitle>
                    <LeftDescription>
                      {t('home.we_are')}
                    </LeftDescription>
                    <LeftTitle style={{ color: '#fa7f7e', paddingTop: '5%' }}>
                      {t('home.link_account')}
                    </LeftTitle>
                    <LeftDescription>
                      {t('home.link_account_description')}
                    </LeftDescription>
                  </ColumnContainer>
                  <iframe
                    src="https://www.youtube.com/embed/QM3WSc3kY8M"
                    width="80%"
                    height={350}
                    style={{ borderRadius: 7, border: 'none' }}
                  />
                </PartContainer>
                <PartContainer>
                  <ColumnContainer>
                    <img
                      style={{ width: '50%', maxHeight: '50vh', objectFit: 'cover', borderRadius: 7 }}
                      src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                    />
                  </ColumnContainer>
                  <ColumnContainer>
                    <RightTitle style={{paddingBottom: '5%'}}>
                      {t('general.projets')}
                    </RightTitle>
                    <RightDescription>
                      {t('home.projet_description')}
                    </RightDescription>
                  </ColumnContainer>
                </PartContainer>
                <PartContainer style={{ backgroundColor: 'rgba(234,164,1,0.1)' }}>
                  <ColumnContainer>
                    <Stat type="Projects" textColor="#f0cf73" cardColor="rgba(240,207,115,0.7)" text={(t('home.project_check'))} collected={1500} number={48} />
                    <RecommandationRow style={{ marginTop: 40 }}>
                      <Grid container spacing={2}>
                        {projects.slice(0, 4).map((project) => {
                          return (
                            <Grid item xs={12} md={3} key={project.id}>
                              <RecommandationProject data={project}/>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </RecommandationRow>
                  </ColumnContainer>
                </PartContainer>
                <PartContainer>
                  <ColumnContainer>
                    <LeftTitle>
                      {t('general.associations')}
                    </LeftTitle>
                    <LeftDescription>
                      {t('home.asso_description')}
                    </LeftDescription>
                  </ColumnContainer>
                  <ColumnContainer>
                    <img
                      style={{ width: '50%', maxHeight: '50vh', marginLeft: 'auto', objectFit: 'cover', borderRadius: 7 }}
                      src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
                    />
                  </ColumnContainer>
                </PartContainer>
                <PartContainer style={{ backgroundColor: 'rgba(38,63,181,0.05)' }}>
                  <ColumnContainer>
                    <Stat type="Associations" textColor="#9cbffd" cardColor="rgba(156,191,253,0.7)" text={t('home.asso_check')} collected={4500} number={10} />
                    <RecommandationRow style={{ marginTop: 40 }}>
                      <Grid container spacing={2}>
                        {associations.slice(0, 4).map((asso) => {
                          return (
                            <Grid item xs={12} md={3} key={asso.id}>
                              <AssociationListingCard association={asso} />
                            </Grid>
                          )
                        })}
                      </Grid>
                    </RecommandationRow>
                  </ColumnContainer>
                </PartContainer>
              </>
            )}
          </ExplorationContainer>
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

export default HomeContent;
