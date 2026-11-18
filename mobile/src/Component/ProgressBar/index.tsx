import React from 'react';
import { Text, View } from 'react-native';
import { ProgressBarContainer } from './styles';

export interface ProgressBarProps {
  percentage: number
}

const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  let { percentage } = props;
  if (percentage > 100) percentage = 100;

  return (
    <ProgressBarContainer>
      <View style={{ width: `${percentage}%`, backgroundColor: '#40ad5b', borderRadius: 10 }}>
        <Text />
      </View>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
