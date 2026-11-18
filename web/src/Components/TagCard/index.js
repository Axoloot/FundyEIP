import React from 'react';

import {
  Container,
  ImageContainer,
  ProjectTitle,
  BlackFilter
} from './style';

export const TagCard = ({data, setter}) => {
  return (
    <Container onClick={() => setter(data.title)}>
      <ImageContainer style={{backgroundImage: `url("${data.image}")`}}>
        <BlackFilter>
          <ProjectTitle>{data.title}</ProjectTitle>
        </BlackFilter>
      </ImageContainer>
    </Container>
  );
}
