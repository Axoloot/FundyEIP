import React from 'react';

import {
  BackgroundImage,
  ProjectTitle,
  Intro
} from './style'

export const TopProject = () => {
  return(
    <BackgroundImage onClick={() => window.location = "/projectId"} style={{backgroundImage: `url("https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2369&q=80")`}}>
      <div style={{height: 150, alignSelf: 'center'}}>
        <Intro>Projet à la une</Intro>
        <ProjectTitle>Sanctuaires aux koalas</ProjectTitle>
      </div>
    </BackgroundImage>
  );
}
