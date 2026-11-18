import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Login, Register } from '../../api/user';

import { useSnackbar } from 'notistack';

import { Button } from '../../Components/UI/Content';

import {
  Label,
  FormInput
} from "../../Components/UI/Form";

import {
  Column,
  Row,
  Subtext,
  Form,
  Lines,
  Description,
  Title,
  Header,
  MainContainer,
  BodyContainer,
  ErrorMsg
} from './style';

const RegisterView = ({ history, setUserLogin }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [step, setStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const submitRegister = async () => {
    try{
      const response = await Register({ email, password, firstname: firstName, lastname: lastName });
      window.localStorage.setItem('user', JSON.stringify(response.data));
      await Login({email, password});
      setUserLogin(response.data);
      enqueueSnackbar(t('login.welcome_back'), {variant: 'success'});
      history.push('/home');
      return;
    } catch(err) {
      if (err.response.status === 409) {
        enqueueSnackbar(`Cette adresse email est deja utilisé`, { variant: 'error'});
      }
      if (err.response.status === 400) {
        enqueueSnackbar(`Cette adresse email n'est pas valide`, { variant: 'error'});
        setStep(0);
      }
      console.log(err);
    }
  }

  const manageRegister = async () => {
    if (step === 0) {
      if (password !== confirmPassword) {
        enqueueSnackbar('Les deux mots de passes doivent etre identiques', { variant: 'error'});
      }
      if (password.length < 8) {
        enqueueSnackbar('Le mot de passe est trop court (Minimum 8 characteres)', { variant: 'error'});
      }
      else {
        if (!email) {
          enqueueSnackbar('Le mail est un champ obligatoire ', { variant: 'error'});
        }
        else if (!password) {
          enqueueSnackbar('Le mot de passe est un champs obligatoire ', { variant: 'error'});
        }
        else {
          setStep(1);
        }
      }
    }
    if (step === 1) {
      if (!firstName) {
        enqueueSnackbar('Le prénom est requis.', { variant: 'error'});
      }
      else if (!lastName) {
        enqueueSnackbar('Le nom de famille est requis..', { variant: 'error'});
      }
      else {
        submitRegister();
      }
    }
  }

  return (
    <BodyContainer>
      <Lines src="/assets/LinesDown.svg" alt="lines" className='hide-mobile' />
      <Header className='hide-mobile'>
        <img src="https://i.imgur.com/UmUh6C2.png" alt="fundy logo" />
      </Header>
      <MainContainer>
        <Title>{t('register.title')}</Title>
        <Description>
        {t('register.description')}
        </Description><br /><br />
        <Form name="register">
          <Row>
            <img src="/assets/Register.png" alt="welcome" className='hide-mobile'/>
            {step === 0 && (
              <Column>
                <Label>{t('form.email')}</Label>
                <FormInput fontSize="14px" type="text" name="email" placeholder="email@address.com" onChange={(e) => setEmail(e.target.value)}  value={email}/>
                <Label>{t('form.password')}</Label>
                <FormInput fontSize="14px" type="password" name="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)}  value={password}/>
                <Label>{t('form.confirm_password')}</Label>
                <FormInput fontSize="14px" type="password" name="confirm-password" placeholder="password"  onChange={(e) => setConfirmPassword(e.target.value)}  value={confirmPassword}/>
              </Column>
            )}
          {step === 1 && (
              <Column>
                <Label>{t('form.firstname')}</Label>
                <FormInput fontSize="14px" type="text" name="firstname" placeholder="John" onChange={(e) => setFirstName(e.target.value)}  value={firstName}/>
                <Label>{t('form.lastname')}</Label>
                <FormInput fontSize="14px" type="text" name="lastname" placeholder="Doe"  onChange={(e) => setLastName(e.target.value)}  value={lastName}/>
              </Column>
            )}
          </Row>
        </Form>
        <Button margin="30px 0px 0px 0px" type="submit" onClick={() => manageRegister()}>{t('form.submit')}</Button>
        <Subtext>
        {t('register.already_have_an_account')}<a href="/"> {t('register.login')}</a>
        </Subtext>
      </MainContainer>
    </BodyContainer>
  );
}

export default RegisterView;
