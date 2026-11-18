import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {  AntDesign } from '@expo/vector-icons';
// import {
//   AssocationName,
//   CardContainer,
//   DescriptionContainer,
//   DescriptionTitle,
//   ImageContainer,
// } from '../../styles.global';
import {
  AssocationNameFav,
  CardContainerFav,
  DescriptionContainerFav,
  DescriptionTitleFav,
  ImageContainerFav,
} from './styles';
import { Association } from '../../Contexts/AssociationsContext';
import { Project } from '../../Contexts/ProjectContext';

interface SmallProjectCardProps {
  project: Project | Association,
  favorite: boolean,
  onPress: () => void,
  follow: (projectId: string) => Promise<boolean | Association[]>,
  unfollow: (projectId: string) => Promise<boolean | Association[]>,
}

const SmallProjectCard = (props: SmallProjectCardProps): JSX.Element => {
  const {
    project,
    favorite: oldFavorite,
    onPress,
    follow,
    unfollow,
  } = props;
  const {
    name,
    title,
    image,
    id,
  } = project;

  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
  const [currentValue] = useState(new Animated.Value(1));
  const [favorite, setFavorite] = useState(oldFavorite);

  const saveFavorite = (): void => {
    setFavorite(!favorite);
    if (favorite) unfollow(id);
    else follow(id);
  };

  useEffect(() => {
    if (favorite) {
      Animated.spring(currentValue, { toValue: 1.3, useNativeDriver: true }).start(() => Animated.spring(currentValue, { toValue:1, useNativeDriver:true }).start());
    }
    if (!favorite) {
      Animated.spring(currentValue, { toValue: 0.8, useNativeDriver: true }).start(() => Animated.spring(currentValue, { toValue:1, useNativeDriver:true }).start());
    }
  }, [favorite, currentValue]);

  return (
    <TouchableWithoutFeedback onPress={onPress} key={title}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <CardContainerFav>
          <TouchableWithoutFeedback onPress={saveFavorite}>
            <ImageContainerFav source={{ uri: image ?? '' }} />
            <AnimatedIcon name="heart" size={40} color={favorite ? 'red' : 'black'} 
              style={{ position: 'absolute', marginTop: '70%', marginLeft: '70%', transform:[{ scale:currentValue }] }}
            />
          </TouchableWithoutFeedback>
        </CardContainerFav>
        <DescriptionContainerFav>
          <DescriptionTitleFav style={{ textAlign: 'left' }}>{name}</DescriptionTitleFav>
          <AssocationNameFav style={{ textAlign: 'left' }}>{title}</AssocationNameFav>
        </DescriptionContainerFav>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SmallProjectCard;
