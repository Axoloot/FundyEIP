/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-lines-per-function */
import React, {
  useState, useContext, useCallback, useEffect, createRef,
} from 'react';
import {
  View, Image, TouchableOpacity,
  Platform, TouchableWithoutFeedback, Keyboard, TextInput, 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../Contexts/AuthContext';
import MainButton from '../../Component/MainButton';
import { RoutesNames } from '../../Router/types';
import { ErrorText, ActionText, Container } from '../Register/styles';
import {
  FundyText,
  NormalText,
  TitleText,
  Input,
  FullWidthView,
} from '../../styles.global';
import {
  CreateAccountContainer,
  EmailContainer,
  ForgotContainer,
  ForgotText,
} from './styles';

const Login = (): JSX.Element => {
  const { navigate } = useNavigation();
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordRef = createRef<TextInput>();

  const getError = useCallback((): boolean => {
    if (password === '') {
      setPasswordError('Your password is empty');
      return true;
    }
    if (email === '') {
      setEmailError('Your email address is empty');
      return true;
    }
    return false;
  }, [password, email, setPasswordError, setEmailError]);

  const GoOnBoarding = useCallback(async () => {
    setEmailError('');
    setPasswordError('');
    if (getError()) return;
    // const OnboardingEnded = await AsyncStorage.getItem('OnboardingEnded');
    const success = await signin({ email, password });
    if (success) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      navigate(RoutesNames.TAB, { itemId: 0 });
    } else setPasswordError('Invalid email and/or password');
  }, [email, password, signin, navigate, getError]);

  useEffect(() => {
    const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;
    if (!emailRegex.test(String(email).toLowerCase()) && email !== '') setEmailError('Please, enter a valid email');
    else setEmailError('');
  }, [email, setEmailError]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={require('../../assets/Welcome.png')} />
          <FullWidthView>
            <TitleText>Welcome !</TitleText>
            <NormalText>
              Please login to your existing
              {' '}
              <FundyText>Fundy</FundyText>
              {' '}
              account to access the application
            </NormalText>
            <EmailContainer>
              <Input
                placeholder="Email address"
                defaultValue={email}
                onChangeText={(mail: string): void => setEmail(mail)}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={(): void => passwordRef.current?.focus()}
              />
              {emailError !== '' && <ErrorText>{emailError}</ErrorText>}
            </EmailContainer>
            <View style={{ marginTop: 10 }}>
              <Input
                ref={passwordRef}
                placeholder="Password"
                defaultValue={password}
                onChangeText={(pass: string): void => setPassword(pass)}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={GoOnBoarding}
              />
              {passwordError !== '' && <ErrorText>{passwordError}</ErrorText>}
            </View>

            <ForgotContainer>
              <TouchableOpacity>
                <ForgotText>Forgot your password ?</ForgotText>
              </TouchableOpacity>
            </ForgotContainer>

            <Container>
              <MainButton text="Login" onPress={GoOnBoarding} />
            </Container>

            <CreateAccountContainer>
              <NormalText>
                {'Don\'t have an existing'}
                <FundyText> Fundy</FundyText>
                {' '}
                account ?
              </NormalText>
              <TouchableOpacity onPress={(): void => navigate(RoutesNames.REGISTER)}>
                <ActionText> Sign Up !</ActionText>
              </TouchableOpacity>
            </CreateAccountContainer>
          </FullWidthView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Login;
