import React, {
  useCallback, useEffect, useRef, useContext,
} from 'react';
import { DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
// import * as Analytics from 'expo-firebase-analytics';

import Login from '../Page/Login';
import Register from '../Page/Register';
import SplashScreen from '../Page/SplashScreen';
import OnBoarding from '../Page/Onboarding';
import Transaction from '../Page/ListTransaction';
import Account from '../Page/LinkBank';
// import AccountPaypal from '../Page/AccountPaypal';
import DetailedProject from '../Page/DetailedProject';
import TabScreen from '../Component/TabNavigator';
import { RootStackParamList, RoutesNames } from './types';
import registerForPushNotificationsAsync from '../utils/registerNotifications';
import { AuthContext } from '../Contexts/AuthContext';
import SearchResult from '../Page/SearchResult';

const navTheme = DefaultTheme;
navTheme.colors.background = 'white';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const Router = (): JSX.Element => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();
  // const { user } = useContext(AuthContext);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onReady={(): void => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      // onStateChange={async (): Promise<void> => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = navigationRef.getCurrentRoute()?.name;

      //   // if (previousRouteName !== currentRouteName && user) {
      //   //   await Analytics.logEvent('screen_view', {
      //   //     currentRouteName,
      //   //     userId: user?.id,
      //   //   });
      //   // }

      //   // Save the current route name for later comparison
      //   routeNameRef.current = currentRouteName;
      // }}
    >
      <Navigator
        initialRouteName={RoutesNames.SPLASH}
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Screen name={RoutesNames.SPLASH} component={SplashScreen} />
        <Screen name={RoutesNames.LOGIN} component={Login} />
        <Screen name={RoutesNames.REGISTER} component={Register} />
        <Screen name={RoutesNames.TAB} component={TabScreen} />
        <Screen name={RoutesNames.PROJECT} component={DetailedProject} />
        <Screen name={RoutesNames.ACCOUNT} component={Account} />
        <Screen name={RoutesNames.TRANSACTIONS} component={Transaction} />
        <Screen name={RoutesNames.SEARCHRESULT} component={SearchResult} />
        <Screen name={RoutesNames.ONBOARDING} component={OnBoarding} />
        {/* <Screen name={RoutesNames.PAYPAL} component={AccountPaypal} /> */}
      </Navigator>
    </NavigationContainer>
  );
};

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldSetBadge: true,
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//   }),
// });

const RouterWithNotifications = (): JSX.Element => {
  const { getUser } = useContext(AuthContext);
  const responseListener = useRef<Subscription>();
  const notificationListener = useRef<Subscription>();

  const init = useCallback(async () => {
    await registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(getUser);
    responseListener.current = Notifications.addNotificationResponseReceivedListener(getUser);

    return (): void => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [getUser]);

  useEffect(() => {
    init();
  }, [init]);

  return <Router />;
};

export default RouterWithNotifications;
