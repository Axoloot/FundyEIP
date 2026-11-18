import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// import { useTranslation } from 'react-i18next'; TODO Add translation

import { GetAllProject } from '../../../api/project';

import { RecommandationProject } from '../../../Components/RecommandationProject';
import AssociationListingCard from '../../../Components/Associations/ListingCard';
import { TagCard } from '../../../Components/TagCard';
import SmallCard from '../../../Components/SmallCard';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';
import notFound from '../../../assets/empty.png';

import { FormInput } from "../../../Components/UI/Form";
import {
  Title,
  BackButton, SearchBackButton
} from "../../../Components/UI/Content";
import {
  MainContainer,
  LoadingText,
  ExplorationContainer,
  RecommandationRow,
  CategorieRow,
  BackContainer
} from './style'
import {Oval} from "react-loader-spinner";

const tags = [
  { title: 'Clothes', image: 'https://www.telegraph.co.uk/content/dam/family/2022/11/01/TELEMMGLPICT000314735064_trans_NvBQzQNjv4Bq-LJS7LKjeK9Zr8QxHnNHGwpwjfeuChtHUoe9wtZBhk8.jpeg?imwidth=680'},
  { title: 'Gaming', image: 'https://media.wired.com/photos/62feb60bcea7c0581e825cb0/master/pass/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg'},
  { title: 'Sport', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80'},
  { title: 'Phone', image: 'https://cdn.shopify.com/s/files/1/0585/5258/2321/files/phone-1-02-02_2160x.jpg?v=1660813885'},
  { title: 'Board Game', image: 'https://img.lemde.fr/2022/11/18/0/339/5832/3888/1440/960/60/0/2fb861e_1668788142068-dsc00978.jpg'},
  { title: 'Restaurant', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80'}
];


const HomeContent = () => {
  // const { t } = useTranslation();  TODO Add translation
  const history = useHistory();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultProject, setResultProject] = useState([]);
  const [search, setSearch] = useState("");

  const manageSearch = (research) => {
    setSearch(research);
    setLoading(true);
    setSearch(research);
    let projetTmp = [];
    projects.map((project) => {
      if (project.title.toLowerCase().includes(research.toLowerCase())) {
        projetTmp.push(project);
      }
      else {
        project.tags.map((tag) => {
          if (tag.toLowerCase().includes(research.toLowerCase())) {
            projetTmp.push(project);
          }
        });
      }
    });
    setResultProject(projetTmp);
    setLoading(false);
  }

  useEffect(() => {
    const fetchData = async() => {
      const projects = await GetAllProject();
      setProjects(projects);
      setLoading(false);
    };
    setTimeout(() => fetchData(), 500);
  }, []);

  return (
    <MainContainer>
      {!loading && (
        <>
          <ExplorationContainer>
            {projects && (
              <>
                <Title margin="0px 0px 45px 0px" style={{ marginBottom: 25 }}>
                  Catégories
                </Title>
                <CategorieRow>
                  <Grid container spacing={4}>
                    {tags.map((tag) => {
                      return(
                        <Grid item xs={12} sm={6} md={3} lg={2} key={tag.title}>
                          <TagCard data={tag} style={{ maxWidth: "100%" }} setter={manageSearch} />
                        </Grid>
                      )
                    })}
                  </Grid>
                </CategorieRow>
                </>
              )}
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 40, marginTop: 50, alignItems: 'center' }}>
              {search.length !== 0 && (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SearchBackButton onClick={ () => setSearch("") }>
                    <Close style={{ fontSize: 25 }}/>
                    Supprimer la recherche
                  </SearchBackButton>
                </div>
              )}
              <FormInput
                padding="10px"
                width="30%"
                height="40px"
                style={{
                  marginLeft: 'auto',
                  minWidth:"200px",
                  fontSize: 16,
                }}

                value={search}
                type="text"
                name="search"
                placeholder="Chercher un projet (Tag ou Titre)"
                onChange={(e) => {manageSearch(e.target.value)}}
              />
            </div>
            {projects && (
              <>
                <Title style={{ marginTop: '2%', marginBottom: 25 }}>
                  {search.length === 0 ? projects.length : resultProject.length} Projet(s) {search.length !== 0 && 'trouvé(s)'}
                </Title>
                <RecommandationRow>
                  <Grid container spacing={2}>
                    {search.length === 0 ? (
                      projects.map((project) => {
                        return (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                            <RecommandationProject data={project}/>
                          </Grid>
                        )
                      })
                    ) : (
                      resultProject.length > 0 ? (
                        resultProject.map((project) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                              <RecommandationProject data={project}/>
                            </Grid>
                          )
                        })
                      ) : (
                        <div>
                          Aucun résultat
                        </div>
                      )
                    )}
                  </Grid>
                </RecommandationRow>
              </>
            )}
          </ExplorationContainer>
        </>
      )}
      {loading && (
        <div style={{ display: 'flex', minHeight: '70vh', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Oval
            height={80}
            width={80}
            color="#F1CF73"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="rgba(241,207,115,0.8)"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
        </div>
      )}
    </MainContainer>
  );
};

export default HomeContent;
