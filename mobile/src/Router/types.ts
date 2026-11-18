import { StackNavigationProp } from '@react-navigation/stack';
import { Association } from '../Contexts/AssociationsContext';
import { Project } from '../Contexts/ProjectContext';
import { FunctionTab } from '../Hooks/types';


export enum RoutesNames {
  SPLASH = 'Splash',
  REGISTER = 'Register',
  LOGIN = 'Login',
  TAB = 'Tab',
  PROJECT = 'Project',
  ACCOUNT = 'Account',
  TRANSACTIONS = 'Transaction',
  SEARCHRESULT = 'SearchResult',
  ONBOARDING = 'OnBoarding',
  // PAYPAL = 'AccountPaypal',
}

export type RootStackParamList = {
  Splash: undefined,
  Register: undefined,
  Login: undefined | { itemId: 0 },
  Tab: undefined | { itemId: 0 },
  Project: { project: Project | Association },
  Account: undefined,
  Transaction: undefined,
  SearchResult: { query: string, fctTab: FunctionTab },
  OnBoarding: { itemId: 0 } | undefined,
  // AccountPaypal: undefined,
};

export type NavigationProps = {
  navigation: StackNavigationProp<RootStackParamList>,
};
