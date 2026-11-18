import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; TODO Add translation
import { GetTrendingProject } from '../../../api/project';
import { GetTrendingAssociations } from '../../../api/association';
import { RecommandationProject } from '../../../Components/RecommandationProject';
import AssociationListingCard from '../../../Components/Associations/ListingCard';
import { Grid } from '@material-ui/core';

import {
  Title,
  SubTitle
} from "../../../Components/UI/Content";

import {
  MainContainer,
  LoadingText,
  ExplorationContainer,
  RecommandationRow,
  StatNumber,
  StatCard,
  StatTitle,
  TitleContainer,
  VidContainer,
  SplitContainer,
  StatContainer,
  TextContainer,
  LeftTitle,
  RightTitle,
  PartContainer,
  LeftDescription
} from './style'

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const Stat = ({ type, cardColor, textColor, text, number, collected }) => (
  <StatContainer>
    <Title style={{ fontSize: 22, width: '100%' }}>
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
  // const { t } = useTranslation();  TODO Add translation
  const history = useHistory();

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
          <ExplorationContainer>
            {projects && associations && (
              <>
                <TitleContainer>
                  <Title style={{ fontSize: 50 }}>
                    Le crowdfunding par
                  </Title>
                  <Title style={{ color: '#9cbffd', fontSize: 50, paddingLeft: 10 }}>
                    l'arrondi
                  </Title>
                </TitleContainer>

                <SubTitle style={{ marginBottom: 150, width: '100%', textAlign: 'center', color: '#3e3e3e' }}>
                  Fundy, la première application de crowdfunding par l’arrondi sur vos transactions du quotidien.
                </SubTitle>
                <PartContainer style={{ backgroundColor: 'rgba(193,11,11,0.05)' }}>
                  <LeftTitle style={{ color: '#fa7f7e' }}>
                    Qu'est ce que Fundy ?
                  </LeftTitle>
                  <LeftDescription style={{ marginTop: 20, width: '70%', marginBottom: 60 }}>
                    Nous, c’est Fundy, la première application de crowdfunding par l’arrondi sur vos transactions du quotidien. Notre objectif est de maximiser le financement des projets participatifs, tout en créant un lien de confiance entre les donateurs et les créateurs de projets.
                  </LeftDescription>
                  <div style={{ display: 'flex', marginTop: 10, marginBottom: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <VidContainer>
                      <SplitContainer>
                        <LeftTitle style={{ color: '#fa7f7e' }}>
                          Lier votre Compte Bancaire
                        </LeftTitle>
                        <LeftDescription>
                          En liant votre compte bancaire nous pourrons appliquer un arrondi sur vos transaction, voici une vidéo tuto si vous ne savez pas comment faire !
                        </LeftDescription>
                      </SplitContainer>
                      <SplitContainer>
                        <iframe src="https://www.youtube.com/embed/SMgQlTSoXf0" width="100%" height={300} style={{ borderRadius: 7, border: 'none' }} />
                      </SplitContainer>
                    </VidContainer>
                  </div>
                </PartContainer>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <img
                    style={{ width: 350, height: 500, objectFit: 'cover', borderRadius: 7 }}
                    src="https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                  />
                  <VidContainer style={{flexDirection: 'column', textAlign: 'end'}}>
                    <Title style={{ marginTop: '6%',width: '70%', textAlign: 'end', justifyContent: 'flex-end', alignContent: 'flex-end'}}>
                      Projets
                    </Title>
                    <SubTitle style={{ marginTop: 20, width: '70%', marginBottom: 60, paddingLeft: '5%' }}>
                      Nous, c’est Fundy, la première application de crowdfunding par l’arrondi sur vos transactions du quotidien. Notre objectif est de maximiser le financement des projets participatifs, tout en créant un lien de confiance entre les donateurs et les créateurs de projets.
                    </SubTitle>
                  </VidContainer>
                </div>
                <PartContainer style={{ backgroundColor: 'rgba(234,164,1,0.1)'}}>
                  <Stat type="Projects" textColor="#f0cf73" cardColor="rgba(240,207,115,0.7)" text="Nos projets participatifs sont vérifiés, nous mettons un point d'honneur sur leurs transparences. Voici ceux du moment !" collected={1500} number={48} />
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
                </PartContainer>
                <TextContainer>
                  <VidContainer style={{ width: 700, marginLeft: 'auto', marginRight: 150, flexDirection: 'column' }}>
                    <Title style={{ width: '100%', marginTop: '6%', textAlign: 'start' }}>
                      Associations
                    </Title>
                    <SubTitle style={{ width: '70%', marginTop: 20, marginBottom: 60, textAlign: 'start' }}>
                      Nous mettons également en avant des associations qui nécessite vos dons ! Chaque associations est vérifiée et nous mettons un point d'honneur à récolter les actions réalisées grâce à vos dons !
                    </SubTitle>

                  </VidContainer>
                  <img
                    style={{ width: 350, height: 500, objectFit: 'cover', borderRadius: 7 }}
                    src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
                  />
                </TextContainer>
                <PartContainer style={{ backgroundColor: 'rgba(38,63,181,0.05)', }}>
                  <Stat type="Associations" textColor="#9cbffd" cardColor="rgba(156,191,253,0.7)" text="Nos associations sont vérifiées, nous mettons un point d'honneur sur leurs transparences. Voici celles du moment !" collected={4500} number={10} />
                  <RecommandationRow style={{ marginTop: 40 }}>
                    <Grid container spacing={2}>
                      {associations.slice(0, 4).map((asso) => {
                        return (
                          <Grid item xs={12} md={3} key={asso.id} onClick={() => history.push(`/Association/${asso.id}`)}>
                            <AssociationListingCard association={asso} />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </RecommandationRow>
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
