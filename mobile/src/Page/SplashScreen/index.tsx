import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import { AuthContext } from '../../Contexts/AuthContext';
import { Container } from './styles';
import { RoutesNames } from '../../Router/types';

const SplashScreen = (): JSX.Element => {
  const { signin } = useContext(AuthContext);
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);

  const isConnected = useCallback(async (): Promise<void> => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    let signState = false;

    if (email !== null && password !== null) { 
      signState = await signin({ email: email, password: password });
    }
    // } else {
    //   console.log('else');
    //   await AsyncStorage.setItem('email', 'demo@example.org');
    //   await AsyncStorage.setItem('password', 'test1234');
    //   email = await AsyncStorage.getItem('email');
    //   password = await AsyncStorage.getItem('password');
    //   if (email && password) { 
    //     signState = await signin({ email: email, password: password });
    //   }
    // }

    // if (email && password) {
    // signState = await signin({ email: 'demo@example.org', password: 'test1234' });
    // } 
    // else {
    //   await AsyncStorage.setItem('email', 'demo@example.org');
    //   await AsyncStorage.setItem('password', 'test1234');
    // }

    setTimeout(() => navigate(signState ? RoutesNames.TAB : RoutesNames.LOGIN, { itemId: 0 }), 350);
    setLoading(!loading);
  }, []);

  useEffect(() => {
    if (loading) isConnected();
  }, [loading, isConnected]);

  return (
    <Container>
      <Image source={require('../../assets/logo.png')} />
    </Container>
  );
};

export default SplashScreen;
