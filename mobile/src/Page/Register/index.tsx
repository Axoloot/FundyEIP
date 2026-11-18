/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import React, {
  useContext, useState, useEffect, useCallback, createRef,
} from 'react';
import {
  View, Image, TouchableOpacity, TextInput,
  TouchableWithoutFeedback, Platform, Keyboard, StyleSheet, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import SelectDropdown from 'react-native-select-dropdown';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../Contexts/AuthContext';
import MainButton from '../../Component/MainButton';
import { RoutesNames } from '../../Router/types';
import {
  Container,
  ErrorText,
  InputText,
  ActionText,
  Already,
  BottomActions,
  LangContainer,
} from './styles';
import {
  FundyText,
  TitleText,
  NormalText,
  Input,
} from '../../styles.global';
import getFlag from '../../utils/getFlag';

const availableLanguages: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
};
const LangWithFlag = (lang: string): string => `${getFlag(lang)}`;

const Register = (): JSX.Element => {
  const { t } = useTranslation();
  const [lang, setlang] = useState('fr');
  const { navigate } = useNavigation();
  const { signup } = useContext(AuthContext);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const lastnameRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const passwordRef = createRef<TextInput>();
  const confirmationRef = createRef<TextInput>();

  // eslint-disable-next-line complexity
  const getError = useCallback((): boolean => {
    if (password === '' || confirmation === '') setPasswordError('Your password can\'t be empty');
    if (password.length < 8 || confirmation.length < 8) setPasswordError('Your password must be at least 8 characters');
    if (email === '') setEmailError('Your email address can\'t be empty');
    if (firstname === '' || lastname === '') setNameError('Names can\'t be empty ');
    if (emailError !== '' || passwordError !== '' || nameError !== '') return true;
    return false;
  }, [password, email, emailError, passwordError, setPasswordError,
    setEmailError, confirmation, firstname, lastname, nameError]);

  const goTab = useCallback(async () => {
    if (getError()) return;
    const success = await signup({
      email, password, firstname, lastname, lang,
    });

    if (success) {
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('password', password);
    }

    /// ici ajouter les premiers screens onboarding 
    if (success) navigate(RoutesNames.ONBOARDING, { itemId: 0 }); 
  }, [signup, getError, email, password, firstname, lastname, navigate, lang]);

  useEffect(() => {
    const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;

    if (!emailRegex.test(String(email).toLowerCase()) && email !== '') setEmailError('Please, enter a valid email');
    else setEmailError('');
  }, [email, setEmailError]);

  useEffect(() => {
    if (password !== confirmation) setPasswordError('Both password must be identical');
    else setPasswordError('');
  }, [password, confirmation, setPasswordError]);

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={require('../../assets/Register.png')} />
          <View>
            <TitleText>{t('Register')}</TitleText>
            <NormalText>
              {t('Create your')}
              {' '}
              <FundyText>Fundy</FundyText>
              {' '}
              {t('account here. You only have to do it once')}
            </NormalText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flex: 1 }}>
                <InputText>
                  {t('FIRSTNAME')}
                </InputText>
                <Input
                  placeholder="First name"
                  defaultValue={firstname}
                  onChangeText={(a: string): void => setFirstname(a)}
                  returnKeyType="next"
                  onSubmitEditing={(): void => lastnameRef.current?.focus()}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputText>
                  {t('LASTNAME')}
                </InputText>
                <Input
                  ref={lastnameRef}
                  placeholder="Last name"
                  defaultValue={lastname}
                  onChangeText={(a: string): void => setLastname(a)}
                  returnKeyType="next"
                  onSubmitEditing={(): void => emailRef.current?.focus()}
                />
              </View>
            </View>
            {nameError !== '' && <ErrorText>{nameError}</ErrorText>}
            <View>
              <InputText>{t('EMAIL_ADRESS')}</InputText>
              <Input
                ref={emailRef}
                placeholder="Email address"
                defaultValue={email}
                onChangeText={(a: string): void => setEmail(a)}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={(): void => passwordRef.current?.focus()}
              />
              {emailError !== '' && <ErrorText>{emailError}</ErrorText>}
            </View>
            <View>
              <InputText>{t('PASSWORD')}</InputText>
              <Input
                ref={passwordRef}
                placeholder="Password"
                defaultValue={password}
                onChangeText={(a: string): void => setPassword(a)}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={(): void => confirmationRef.current?.focus()}
              />
            </View>
            <View>
              <InputText>{t('CONFIRM')}</InputText>
              <Input
                ref={confirmationRef}
                placeholder="Confirm Your Password"
                defaultValue={confirmation}
                onChangeText={(a: string): void => setConfirmation(a)}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={goTab}
              />
              {passwordError !== '' && <ErrorText>{passwordError}</ErrorText>}
            </View>
            <LangContainer>
              <SelectDropdown
                data={Object.keys(availableLanguages)}
                defaultValue={lang}
                onSelect={(newLang): void => {
                  setlang(newLang);
                  i18next.changeLanguage(newLang);
                }}
                buttonTextAfterSelection={LangWithFlag}
                rowTextForSelection={LangWithFlag}
                buttonStyle={styles.dropdown1BtnStyle}
                dropdownIconPosition="right"
              />
              <MainButton text={t('Sign Up')} onPress={goTab} />
            </LangContainer>
            <BottomActions>
              <Already>
                <NormalText>
                  {t('Already have an existing')}
                  {' '}
                  <FundyText>Fundy</FundyText>
                  {' '}
                  {t('account ?')}
                  {' '}
                </NormalText>
                <TouchableOpacity
                  onPress={(): void => navigate(RoutesNames.LOGIN, { itemId: 0 })}
                >
                  <ActionText>{t('Login')}</ActionText>
                </TouchableOpacity>
              </Already>
            </BottomActions>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '20%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default Register;
