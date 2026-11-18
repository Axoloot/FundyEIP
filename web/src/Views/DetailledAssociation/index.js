// React
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';

// Utils
import useQuery from "../../utils/useQuery";

// API
import {
  GetAssociationDetails,
  LikeAssociation,
  UnlikeAssociation,
  Donate,
  GetRelatedAssociations,
  GetCardPaymentLink
} from "../../api/association";
import { getMyUser } from '../../api/user';

// UI
import ArrowBack from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';

import AchievementCard from '../../Components/AchievementCard';
import { RecommandationAssos } from '../../Components/RecommandationAssos';


import {
  BodyContainer,
  Tags,
  Tag,
  Button,
  BackButton,
  ImageContainer,
  Title
} from "../../Components/UI/Content";

import {
  Card,
  CardText
} from "../../Components/UI/Content/card";

import {
  FormInput
} from "../../Components/UI/Form"

import {
  AssociationInfos,
  InfoContainer,
  ButtonContainer,
  BackText,
  RecommandationRow
} from "./style";
import {useTranslation} from "react-i18next";

const DetailledAssociation = () => {
  const { t } = useTranslation();

  const params = useParams();
  const history = useHistory();
  let query = useQuery();
  const { enqueueSnackbar } = useSnackbar();

  const [ user, setUser ] = useState({});
  const [ association, setAssociation ] = useState({});
  const [ relatedAssociations, setRelatedAssociations] = useState([]);
  const [ modal, setModal ] = useState(false);
  const [ amount, setAmount ] = useState(0);
  const [ isLiked, setIsLiked ] = useState(false);

  const fetchAssociation = async () => {
    try {
      const resp = await GetAssociationDetails({ id: params.id });
      setAssociation(resp);
      console.log("ASSOC: ", resp);
    } catch {
      enqueueSnackbar("Une erreure est survenue", { variant: "error" });
    };
  };

  const fetchRelatedAssociations = async () => {
    try {
      const resp = await GetRelatedAssociations();
      setRelatedAssociations(resp.weeklyAssociations);
    } catch {
      enqueueSnackbar("Une erreure est survenue.", { variant: "error" });
    };
  };

  const fetchUser = async () => {
    try {
      const resp = await getMyUser();
      setUser(resp);
    } catch {
      enqueueSnackbar("Une erreure est survenue", { variant: "error" });
    };
  };

  const addToFav = async () => {
    try {
      await LikeAssociation({id: association.id});
      await fetchUser();
      enqueueSnackbar("L'association a été ajouter aux favoris.", { variant: "success" });
    }
    catch(err) {
      enqueueSnackbar("Une erreur est survenue.", { variant: "error"});
    }
  }

  const RemoveFromFav = async () => {
    try {
      await UnlikeAssociation({id: association.id});
      await fetchUser();
      enqueueSnackbar("L'association a été retirer des favoris.", { variant: "success" });
    }
    catch(err) {
      enqueueSnackbar("Une erreur est survenue.", { variant: "error" });
    }
  }

  const donateByCard = async () => {
    try {
      const redirects = window.location.href.split('?')[0];
      const data = await GetCardPaymentLink({
        amount,
        id: association.id,
        successUrl: redirects + "?payment=success",
        cancelUrl: redirects + "?payment=canceled"
      });
      window.location.href = data.url;
    } catch(err) {
      enqueueSnackbar("Une erreure est survenue.", { variant: "error" });
    }
  }

  const giveDonation = async () => {
    try {
      await Donate({amount, id: association.id});
      setModal(false);
      await  fetchAssociation();
      await  fetchUser();
      enqueueSnackbar("Merci pour votre donation.", { variant: "success" });
      window.location.reload();
    } catch(err) {
      if (err.response.data.message === "not enough in piggy bank") {
        enqueueSnackbar("Vous n'avez pas un solde suffisant pour faire cette action.", { variant: "error" });
      }
      console.log(err);
    }
  }

  const goTo = async (path) => {
    try {
      if (path === -1) {
        history.goBack();
      } else {
        history.push(path);
      }
    } catch {
      enqueueSnackbar("Une erreure est survenue", { variant: "error" });
    }
  }

  useEffect(async () => {
    await fetchUser();
    await fetchAssociation();
    await fetchRelatedAssociations();
    const paymentStatus = query.get("payment");
    if (paymentStatus === "success") {
      console.log("HOLA !!")
      enqueueSnackbar("Merci pour votre donation.", { variant: "success" });
    } else if (paymentStatus === "canceled") {
      enqueueSnackbar("La transaction n'a pu aboutir.", { variant: "error" });
    }
  }, [ params.id ]);

  useEffect(() => {
    if (user.FollowedAssociation && association.id) {
      setIsLiked(user.FollowedAssociation.findIndex((item) => item.id === association.id) >= 0);
    }
  }, [ user, association ]);

  return (
    <BodyContainer>
      <BackButton onClick={ () => goTo(-1) }>
        <ArrowBack style={{fontSize: 35}}/>
        Retour
      </BackButton>
      <Card margin="40px 0 0 0" padding="20px">
        <AssociationInfos>
          <InfoContainer style={{ flexBasis: "45%" }}>
            <ImageContainer width="100%" height="40vh" bg={"url(" + association.image + ")"}></ImageContainer>
            <CardText style={{ display: 'flex', alignItems: 'center' }} margin="10px 0px 0px 0px">{ association.name } à déjà collecté
              <div style={{ marginLeft: 5, fontWeight: 'bold' }}>
                { (association.raisedCurrently / 100).toFixed(2) } €
              </div>
              .
            </CardText>
          </InfoContainer>
          <InfoContainer style={{ flexBasis: "55%" }}>
            <h2 style={{ textAlign: 'start' }}>{ association.name }</h2>
            <p style={{textAlign: 'start', paddingTop: '3%'}}>{ association.description }</p>

            <Tags>
              { association.isVerified ? <Tag padding="5px 10px 5px 10px" bg="#9CBFFD">Vérifié</Tag> : null }
              { association?.tags?.map((tag) => {
                return ((tag) ? <Tag padding="5px 10px 5px 10px" key={ tag }>{ tag }</Tag> : null);
              })}
            </Tags>
            {!modal && (
              <>
                <ButtonContainer style={{ marginBottom: '20px', marginTop: '50px', width: '100%' }}>
                  {!isLiked && (
                    <Button onClick={() => addToFav()}>{t('commons.add_to_favorite')}</Button>
                  )}
                  {isLiked && (
                    <Button bg="#F97F7E" onClick={() => RemoveFromFav()}>{t('commons.remove_from_favorite')}</Button>
                  )}
                  <Button style={{ marginLeft: 20 }} onClick={() => setModal(true)}>{t('commons.make_a_donation')}</Button>
                </ButtonContainer>
              </>
            )}
            {modal && (
              <>
                <BackText style={{ marginTop: '25px' }}>{t('commons.amount_to_donate')}</BackText>
                <FormInput width="50%" style={{ fontSize: 16 }} margin="0px 0px 30px 0px" min={0} placeholder="Montant en euros" type="number" onChange={(e) => setAmount(e.target.value)}/>
                <ButtonContainer style={{ marginBottom: 20, width: '100%' }}>
                  <Button bg="#F97F7E" onClick={() => setModal(false)}>{t('commons.back')}</Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => giveDonation()}> {t('commons.make_a_donation_2')} </Button>
                  <Button style={{ marginLeft: 20 }} onClick={() => donateByCard()}> {t('commons.credit_card')} </Button>
                </ButtonContainer>
              </>
            )}

          </InfoContainer>
        </AssociationInfos>
        {!!association?.Actions?.length && (
          <>
            <Title margin="55px auto 45px auto">
              Les dernieres actions menées.
            </Title>
            <Grid container spacing={4}>
              {association.Actions.map((achievement) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.title}>
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Card>
      <div>
        <Title margin="55px 0px 45px 0px" style={{ marginTop: 50, marginBottom: 25  }}>
          Voir des associations similaires
        </Title>
        <RecommandationRow>
          <Grid container spacing={2}>
            { relatedAssociations.filter((item) => item.id != association.id).map((association) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={association.id}>
                  <RecommandationAssos data={association}/>
                </Grid>
              )
            })}
          </Grid>
        </RecommandationRow>
      </div>
    </BodyContainer>
  );
};

export default DetailledAssociation;
