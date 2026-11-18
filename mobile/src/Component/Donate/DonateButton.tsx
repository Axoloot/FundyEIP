import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextBoldWhite } from '../../styles.global';
import { DonateContainer } from './styles';

export interface DonateButtonProps {
  onPress: () => void;
}

const DonateButton = (props: DonateButtonProps): JSX.Element => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginTop: 15 }}
    >
      <DonateContainer>
        <FontAwesome5 name="donate" size={24} color="white" />
        <TextBoldWhite>Donate</TextBoldWhite>
      </DonateContainer>
    </TouchableOpacity>
  );
};

export default DonateButton;
