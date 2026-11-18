import React from 'react';
import { Container, Indicator } from './styles';

interface OnboardingIndicatorProps {
  pageNb: number;
}

const OnboardingIndicator = (props: OnboardingIndicatorProps): JSX.Element => {
  const { pageNb } = props;
  const colors = [
    ['#EB8682', '#FAE5E3'],
    ['#F1CF73', '#FFEDC5'],
    ['#A2BFF8', '#E5ECF9'],
  ];

  return (
    <Container>
      <Indicator color={colors[pageNb - 1][pageNb === 1 ? 0 : 1]} />
      <Indicator color={colors[pageNb - 1][pageNb === 2 ? 0 : 1]} />
      <Indicator color={colors[pageNb - 1][pageNb === 3 ? 0 : 1]} />
    </Container>
  );
};

export default OnboardingIndicator;
