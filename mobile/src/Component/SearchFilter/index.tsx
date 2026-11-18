import React from 'react';
import {
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TagButton from '../TagButton';

export interface FilterViewProps {
  TagTabName: string[],
  filter: (tag: string) => void
}

const FilterView = ({ TagTabName, filter }: FilterViewProps): JSX.Element => (
  <View>
    <ScrollView style={{ display: 'flex' }} horizontal showsHorizontalScrollIndicator={false}>
      {TagTabName.map((tag, i) => <TagButton tag={tag} setTags={filter} key={`${tag} ${i}`} />)}
    </ScrollView>

  </View>

);
export default FilterView;
