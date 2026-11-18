import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import axios from 'axios';
// import { TourGuideProvider } from 'rn-tourguide';

import { AuthContextProvider } from './src/Contexts/AuthContext';
import Router from './src/Router/router';
import './src/utils/i18n';
import { ProjectsContextProvider } from './src/Contexts/ProjectContext';
import { AssociationContextProvider } from './src/Contexts/AssociationsContext';
import StripeProvider from './src/utils/stripeProvider';

axios.defaults.headers.origin = 'EXPOAPP';
axios.interceptors.response.use((res) => res, (err) => console.warn({ ...err }));

const App = (): JSX.Element => {

  // useEffect(() => {
  //   axios.interceptors.request.use(async (req) => {
  //     try {
  //       await Analytics.logEvent('api_request', {
  //         service: 'project',

  //         url: req.url,
  //       });
  //     } catch (e) {
  //       console.log('api_request Metrics', e);
  //     }
  //     return req;
  //   }, (err) => console.warn({ ...err }));

  //   axios.interceptors.response.use(async (res) => {
  //     try {
  //       await Analytics.logEvent('api_response', {
  //         service: 'project',
  //         status: res.status,
  //       });
  //     } catch (e) {
  //       console.log('api_request Metrics', e);
  //     }
  //     return res;
  //   }, (err) => console.warn({ ...err }));

  // }, []);

  const [loaded] = useFonts({
    'Futura': require('./src/assets/fonts/futura-bold.otf'),
    'Open': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'OpenBold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!loaded) return <></>;
  return (
  // <TourGuideProvider {...{ borderRadius: 16 }}>
    <StripeProvider>
      <AuthContextProvider>
        <ProjectsContextProvider>
          <AssociationContextProvider>
            <Router />
          </AssociationContextProvider>
        </ProjectsContextProvider>
      </AuthContextProvider>
    </StripeProvider>
  //  </TourGuideProvider> 
  );
};

export default App;



// app.json

// "plugins": [
//   [
//     "expo-notifications",
//     {
//       "icon": "./local/assets/notification-icon.png",
//       "color": "#ffffff",
//       "sounds": [
//         "./local/assets/notification-sound.wav",
//         "./local/assets/notification-sound-other.wav"
//       ]
//     }
//   ]
// ]