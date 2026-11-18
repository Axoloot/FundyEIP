/* eslint-disable max-lines-per-function */
import React, {
  useEffect, useContext, useState, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view';
import { TouchableWithoutFeedback } from 'react-native';

import ProjectList from '../../Component/ProjectList';

import {
  EmptyContainer,
  EmptyText,
  EmptyImage,
  HorizontalScroll,
  Title,
  HomeContainer,
  SuggestionTitleImage,
  BackgroundTitle,
} from './styles';

import {
  blackText,
  darkBackground, FullView, whiteBackground,
} from '../../styles.global';
import { AuthContext } from '../../Contexts/AuthContext';
import { RoutesNames } from '../../Router/types';
import { Project, ProjectsContext } from '../../Contexts/ProjectContext';
import { Association, AssociationContext } from '../../Contexts/AssociationsContext';

const Suggestion = (): JSX.Element => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const { user } = useContext(AuthContext);
  const { projects, getTrending: getProjectTrending } = useContext(ProjectsContext);
  const { associations, getTrending: getAssoTrending } = useContext(AssociationContext);
  const [trending, setTrending] = useState<Project | Association | undefined>();

  const themes = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteBackground : blackText,
  };

  const setTrendingProject = useCallback(async () => {
    const project = await getProjectTrending();
    const asso = await getAssoTrending();
    if (!project || !asso) return;
    setTrending(Math.random() > 0.5 ? project[0] : asso[0]);
  }, [getAssoTrending, getProjectTrending]);

  useEffect(() => {
    setTrendingProject();
  }, [setTrendingProject]);

  const RenderProjectList = (): JSX.Element => {
    if (!projects) {
      return (
        <EmptyContainer>
          <EmptyImage />
          <EmptyText>{t('no_projects')}</EmptyText>
        </EmptyContainer>
      );
    }

    return (
      <>
        <BackgroundTitle>
          <Title>{t('Suggestion')}</Title>
        </BackgroundTitle>
        <HorizontalScroll showsHorizontalScrollIndicator={false} horizontal theme={themes}>
          <ProjectList
            projects={[
              ...projects,
              ...associations,
            ].sort(() => 0.5 - Math.random())}
          />
        </HorizontalScroll>
        <BackgroundTitle>
          <Title>{t('Projects')}</Title>
        </BackgroundTitle>
        <HorizontalScroll showsHorizontalScrollIndicator={false} horizontal theme={themes}>
          <ProjectList
            projects={projects}
          />
        </HorizontalScroll>
        <BackgroundTitle>
          <Title>{t('Association')}</Title>
        </BackgroundTitle>
        <HorizontalScroll showsHorizontalScrollIndicator={false} horizontal theme={themes}>
          <ProjectList
            projects={associations}
          />
        </HorizontalScroll>
      </>
    );
  };

  return (
    <ThemeProvider theme={themes}>
      <HomeContainer>
        <ImageHeaderScrollView
          maxHeight={200}
          minHeight={0}
          foregroundExtrapolate="clamp"
          headerImage={trending?.image ? { uri: `${trending?.image}` } : {}}
          renderForeground={(): JSX.Element => (
            <TouchableWithoutFeedback onPress={(): void => navigate(RoutesNames.PROJECT, { project: trending })}>
              <FullView>
                <SuggestionTitleImage>{t('project_une')}</SuggestionTitleImage>
              </FullView>
            </TouchableWithoutFeedback>
          )}
        >
          <RenderProjectList />
        </ImageHeaderScrollView>
      </HomeContainer>
    </ThemeProvider>

  );
};

export default Suggestion;
