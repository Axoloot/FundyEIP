// React
import { Oval } from 'react-loader-spinner'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// API
import { GetAllAssociations } from "../../api/association";

// UI
import { Grid } from "@material-ui/core";
import AssociationListingCard from "../../Components/Associations/ListingCard";
import { FormInput } from "../../Components/UI/Form";

import { Title, SearchBackButton } from "../../Components/UI/Content";

import {
  CategorieRow,
  ExplorationContainer,
  MainContainer,
  RecommandationRow
} from "../Projects/ProjectsContent/style";
import {TagCard} from "../../Components/TagCard";
import Close from "@material-ui/icons/Close";

const tags = [
  { title: 'Animal', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2359&q=80'},
  { title: 'Health', image: 'data:image/jpeg;base64,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'},
  { title: 'Children', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80'},
  { title: 'Planet', image: 'https://www.staffsante.fr/contenu/wp-content/uploads/2015/07/humanitaire.jpg'},
  { title: 'Sport', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80'},
  { title: 'Ocean', image: 'https://www.surfandthecity.fr/wp-content/uploads/2020/06/surfrider-protection-des-oceans.jpg'}
];

const ListAssociations = () => {
  const history = useHistory();
  const [ search, setSearch ] = useState('');
  const [ associations, setAssociations ] = useState([]);
  const [ result, setResult ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAssociations = async () => {
    try {
      const resp = await GetAllAssociations();
      setAssociations(resp);
      setResult(resp);
    } catch {
      setErrorMessage("Une erreure est survenue");
    } finally {
      setLoading(false);
    }
  };

  const manageSearch = (research) => {
    setSearch(research);
    setLoading(true);
    let assoTmp = [];
    associations.map((asso) => {
      if (asso.title.toLowerCase().includes(research.toLowerCase())) {
        assoTmp.push(asso);
      }
      else {
        asso.tags.map((tag) => {
          if (tag.toLowerCase().includes(research.toLowerCase())) {
            assoTmp.push(asso);
          }
        });
      }
    });
    setResult(assoTmp);
    setLoading(false);
  }

  const goTo = async (path) => {
    try {
      history.push(path);
    } catch {
      setErrorMessage("Une erreure est survenue");
    }
  }

  useEffect(() => {
    setTimeout(() => fetchAssociations(), 500);
  }, []);

  return (
    <MainContainer style={{ paddingTop: '6%' }}>
      {!loading && (
        <>
          <ExplorationContainer>
            {associations && (
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
                placeholder="Chercher une association (Tag ou Titre)"
                onChange={(e) => {manageSearch(e.target.value)}}
              />
            </div>
            {associations && (
              <>
                <Title style={{ marginTop: '2%', marginBottom: 25 }}>
                  {search.length === 0 ? associations.length : result.length} Association(s) {search.length !== 0 && 'trouvé(s)'}
                </Title>
                <RecommandationRow>
                  <Grid container spacing={2}>
                    {search.length === 0 ? (
                      associations.map((asso) => {
                        return (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={asso.id}>
                            <AssociationListingCard association={asso}/>
                          </Grid>
                        )
                      })
                    ) : (
                      result.length > 0 ? (
                        result.map((asso) => {
                          return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={asso.id}>
                              <AssociationListingCard association={asso}/>
                            </Grid>
                          )
                        })
                      ) : (
                        <div>
                          Aucun résulta
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
            color="#9cbffd"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="rgba(156,191,253,0.7)"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
        </div>
      )}
    </MainContainer>
  );
};

export default ListAssociations;
