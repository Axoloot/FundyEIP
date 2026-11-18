import React, { useState  } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { resetPassword } from '../../api/user';

import { useSnackbar } from 'notistack';
import {
  Title,
  BodyContainer,
  Lines,
  Header,
  MainContainer,
  Description,
  Form,
  FormInput,
  Subtext
} from './style';

import { Button } from "../../Components/UI/Content";

export default function ResetView({ history }) {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [token, setToken] = useState('');

  const askReset = async () => {
    try{
      if (!password) {
        enqueueSnackbar('Le champ mot de passe est obligatoire ! ', { variant: 'error'});
        return;
      }
      else if (password.length < 8) {
        enqueueSnackbar('Le mot de passe est trop court (Minimum 8 characteres)', { variant: 'error'});
        return;
      }
      else if (!password2) {
        enqueueSnackbar('Le champ confirmation mot de passe est obligatoire ! ', { variant: 'error'});
        return;
      }
      else if (password !== password2) {
        enqueueSnackbar('Les deux mots de passes sont differents ', { variant: 'error'});
        return;
      }
      const token = params.token.split('=')[1].split('&')[0];
      const response = await resetPassword({ password, token: token });
      if (response.status === 200) {
        enqueueSnackbar('Votre mot de passe à été reinitialiser ! ', {variant: 'success'});
        history.push('/');
      }
      else {
        enqueueSnackbar('Une erreur est survenue ! ', {variant: 'error'});
      }
    } catch(err) {
      enqueueSnackbar('An error has occured ! ', { variant: 'error'});
      console.log(err);
    }
  };

  return (
    <BodyContainer>
      <Lines src="/assets/LinesDown.svg" alt="lines" />
      <Header>
        <img src="https://i.imgur.com/tniadbk.png" alt="fundy logo" />
      </Header>
      <MainContainer>
        <img src="/assets/Welcome.svg" alt="welcome" />
        <Title>Reset your password ?</Title>
        <Description>
        We will guide you through the process of resetting your password.
        </Description>
        <Form name="login">
          <FormInput type="text" value={password} name="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <FormInput type="text" value={password2} name="password2" onChange={e => setPassword2(e.target.value)} placeholder="Confirmaton Password" />
          <Button onClick={() => askReset()}>Reset my password</Button>
        </Form>
        <Subtext>
          {t("Don’t have an existing Fundy account?")}<a href="/register">{t('Sign up')}!</a>
        </Subtext>
        <Subtext>
          <a href="/">I want to login !</a>
        </Subtext>
      </MainContainer>
    </BodyContainer>
  );
}
