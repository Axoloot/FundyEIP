import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../Contexts/AuthContext';
import { RoutesNames } from '../../Router/types';
import {
  Container,
  TextContainer, WalletText,
} from './styles';
import { useSpring, animated } from '@react-spring/native';
import { blackText, darkBackground, whiteBackground, whiteText } from '../../styles.global';


const AnimatedNumbers = ({ n, mycolor }: { n: number, mycolor: string }): JSX.Element => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.Text style={{
    fontSize: 50, fontWeight: 'bold',
    color: mycolor ?? 'black',
  }}>
    {number.to((nb) => nb.toFixed(0))}
  </animated.Text>;
};


const PiggyBank = (): JSX.Element => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { user } = useContext(AuthContext);
  const [animateToNumber, setAnimateToNumber] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimateToNumber(user ? user.piggyBank / 100 : 0);
    }, 500);
  });


  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteText : blackText,
  };
  
  return (
    <Container>
      <TouchableOpacity onPress={(): void => navigate(RoutesNames.TRANSACTIONS)}>
        <TextContainer>
          <AnimatedNumbers
            mycolor={theme.mainTextColor}
            n={animateToNumber}
          />
          <WalletText>{t('piggybank')}</WalletText>
        </TextContainer>
      </TouchableOpacity>
    </Container>
  );
};

export default PiggyBank;
