import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Association } from '../../Contexts/AssociationsContext';
import { Project } from '../../Contexts/ProjectContext';
import {
  AssocationName,
  DescriptionContainer,
  DescriptionTitle,
  SuggestionImageContainer,
} from '../../styles.global';
import { CardContainer } from './styles';

interface SuggestCardProps {
  project: Project | Association;
  onPress: () => void;
}

const SuggestCard = ({ project, onPress }: SuggestCardProps): JSX.Element => {
  const {
    name, title, image,
  } = project;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <CardContainer>
          <SuggestionImageContainer source={{ uri: image ?? '' }} />
        </CardContainer>
        <DescriptionContainer>
          <DescriptionTitle style={{ textAlign: 'left' }}>{name}</DescriptionTitle>
          <AssocationName style={{ textAlign: 'left' }}>{title}</AssocationName>
        </DescriptionContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SuggestCard;
