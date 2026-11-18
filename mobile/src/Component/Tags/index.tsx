import React from 'react';
import { TagContainer, Tag, TagName } from './styles';

export interface TagsProps {
  tags: string[];
}

const Tags = (props: TagsProps): JSX.Element => {
  const { tags } = props;

  return (
    <TagContainer>
      {tags.map((tag) => {
        return (
          <Tag key={tag}>
            <TagName>{tag}</TagName>
          </Tag>
        );
      })}
    </TagContainer>
  );
};

export default Tags;
