import React, { useState  } from "react";
import { useTranslation } from 'react-i18next';

import { Login } from '../../api/user';

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

export default function LoginView({ history, setUserLogin }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const submitLogin = async (email, password) => {
    try{
      if (!email) {
        enqueueSnackbar(t('errors.required.email'), { variant: 'error'});
        return;
      }
      else if (!password) {
        enqueueSnackbar(t('errors.required.password'), { variant: 'error'});
        return;
      }
      const response = await Login({ email, password });
      enqueueSnackbar(t('login.welcome_back'), {variant: 'success'});
      window.localStorage.setItem('user', JSON.stringify(response.data));
      setUserLogin(response.data);
      history.push('/Home');
    } catch(err) {
      enqueueSnackbar(t('errors.invalid.emailorpassword'), { variant: 'error'});
      console.log(err);
    }
  };

  const isDemo = process.env.DEMO_MODE === 'true';
  const [email, setEmail] = useState(isDemo ? 'demo@demo.com' : '');
  const [password, setPassword] = useState(isDemo ? 'test1234' : '');

  return (
    <BodyContainer>
      <Lines src='/assets/LinesDown.svg' alt="lines" />
      <Header>
        <img src="https://i.imgur.com/UmUh6C2.png" alt="fundy_logo" />
      </Header>
      <MainContainer>
        <img src='/assets/Welcome.png' alt="welcome" />
        <Title>{t('login.title')}</Title>
        <Description>
          {t('login.description')}
        </Description>
        <Form name="login">
          <FormInput placeholder="demo@demo.com" margin="30px 0px 0px 0px" type="text" value={email} name="email" onChange={e => setEmail(e.target.value)} />
          <FormInput placeholder="password" margin="30px 0px 0px 0px" type="password" value={password} name="password"  onChange={e => setPassword(e.target.value)} />
          <Button margin="30px 0px 0px 0px" onClick={() => submitLogin(email, password)}>{t('Login')}</Button>
        </Form>
        <Subtext>
          {t("login.no_account")} <a href="/register">{t('login.signup')}!</a>
        </Subtext>
        <Subtext>
          <a href="/forgot">{t('login.forgot_password')}</a>
        </Subtext>
      </MainContainer>
    </BodyContainer>
  );
}
