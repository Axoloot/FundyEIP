import React, { useState  } from "react";
import { useTranslation } from 'react-i18next';
import { forgotPassword } from '../../api/user';
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

export default function ForgotView({ history }) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');

  const askEmail = async (email) => {
    try{
      if (!email) {
        enqueueSnackbar(t('commons.required.email'), { variant: 'error'});
        return;
      }
      await forgotPassword({ email });
      enqueueSnackbar(t('commons.mail_snet'), {variant: 'success'});
      history.push('/');
    } catch(err) {
      enqueueSnackbar(t('erros.invalid.emailorpassword'), { variant: 'error'});
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
        <Title>{t('login.forgot_password')}</Title>
        <Description>
          {t('forgot.description')}
        </Description>
        <Form name="login">
          <FormInput type="text" value={email} name="email" onChange={e => setEmail(e.target.value)} placeholder="email@address.com" />
          <Button style={{marginTop: '5%'}} onClick={() => askEmail(email)}>{t('forgot.send_email')}</Button>
        </Form>
        <Subtext>
          {t("forgot.no_account")}<a href="/register">{t('forgot.sign_up')}!</a>
        </Subtext>
        <Subtext>
          <a href="/">{t('forgot.want_to_log')}</a>
        </Subtext>
      </MainContainer>
    </BodyContainer>
  );
}
