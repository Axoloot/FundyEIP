import React from 'react';
import { FundRaised } from '../../styles.global';
import DonateButton from './DonateButton';
import { Container, InfoContainer } from './styles';

export interface DonateProps {
  onPress: () => void;
  raisedCurrently: number;
  goal: number;
}

const Donate = (props: DonateProps): JSX.Element => {
  const { onPress, raisedCurrently, goal } = props;

  const goalText = goal ? `${raisedCurrently}€ / ${goal}€` : `${raisedCurrently}€`;

  return (
    <Container>
      <DonateButton onPress={onPress} />
      <InfoContainer>
        <FundRaised>
          {goalText}
        </FundRaised>
      </InfoContainer>
    </Container>

  );
};

export default Donate;
