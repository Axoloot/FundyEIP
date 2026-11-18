import React, { useContext  } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../../Page/Search';
import Profil from '../../Page/Profil';
import TabBarIcon from '../TabBarIcon';
import Suggestion from '../../Page/Suggestion';
import Favorite from '../../Page/Favorite';
import { AuthContext } from '../../Contexts/AuthContext';

import {
  darkBackground, whiteBackground,
} from '../../styles.global';
// import { TourGuideZone, TourGuideZoneByPosition } from 'rn-tourguide';

// import AsyncStorage from '@react-native-async-storage/async-storage';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  // const [tutorialShouldStart, setTutorial] = useState(false);
  const themes = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteBackground : darkBackground,
  };

  // const { canStart, start, eventEmitter } = useTourGuideController();

  // useEffect(() => {
  //   AsyncStorage.getItem('tutorial').then((tut) => setTutorial(tut !== 'true'));
  // }, []);

  // eventEmitter?.on('stop', () => AsyncStorage.setItem('tutorial', 'true'));

  // useEffect(() => {
  //   if (canStart && tutorialShouldStart) {
  //     start();
  //   }
  // }, [canStart, tutorialShouldStart, start]);

  // return (<View style={{ height: '100%', width:'100%', justifyContent: 'center', alignItems: 'center' }}><Text>Login ou register a marcher</Text></View>);
  return (
    <Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: themes.mainBackgroundColor } }}
    >
      <Screen
        name="Home"
        component={Suggestion}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }): JSX.Element => (
            
            <TabBarIcon name="home" size={24} color="#EB8682" focused={focused} />
          ),
        }}
      />
      <Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ focused }): JSX.Element => (
            <TabBarIcon name="hearto" size={24} color="#A2BFF8" focused={focused} />
          ),
        }}
      />

      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused }): JSX.Element => (
            <TabBarIcon name="search1" size={24} color="#0b9e03" focused={focused} />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Profil}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }): JSX.Element => (
            <TabBarIcon name="user" size={24} color="#F1CF73" focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};

export default TabNavigator;
