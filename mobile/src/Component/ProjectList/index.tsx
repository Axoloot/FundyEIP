import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Association } from '../../Contexts/AssociationsContext';
import { Project } from '../../Contexts/ProjectContext';

import { RoutesNames } from '../../Router/types';
import SuggestCard from '../SuggestionCard';
import { Container } from './styles';

interface ListProps {
  projects: (Project | Association)[],
}

const ProjectList = ({ projects }: ListProps): JSX.Element => {
  const { navigate } = useNavigation();

  return (
    <Container>
      {projects.map(
        (project) => (
          <SuggestCard
            key={project.name}
            project={project}
            onPress={(): void => navigate(RoutesNames.PROJECT, { project })}
          />
        ),
      )}
    </Container>
  );
};

export default ProjectList;
