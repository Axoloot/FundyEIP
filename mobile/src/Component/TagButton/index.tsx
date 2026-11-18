import React, { useState } from 'react';

import {
  TagButtonContainer, TagName,
} from './styles';

export interface TagButtonProps { tag: string, setTags: (tag:string) => void }

const TagButton = ({ tag, setTags }:TagButtonProps): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <TagButtonContainer
      bgcolor={isSelected ? 'lightgreen' : 'lightgrey'}
      onPress={(): void => {
        setIsSelected(!isSelected);
        setTags(tag);
      }}
    >
      <TagName>{tag}</TagName>
    </TagButtonContainer>
  );
};

export default TagButton;
