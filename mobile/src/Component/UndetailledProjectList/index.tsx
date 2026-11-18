/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SmallProjectCard from '../SmallProjectCard';
import { AuthContext } from '../../Contexts/AuthContext';
import { RoutesNames } from '../../Router/types';
import { FunctionTab } from '../../Hooks/types';
import { Project, ProjectsContext } from '../../Contexts/ProjectContext';
import { Association, AssociationContext } from '../../Contexts/AssociationsContext';

export interface UndetailledProjectListProps {
  query: string;
  page: string;
  fctvalidator?: FunctionTab;
}

const UndetailledProjectList = ({ query = '', page = '', fctvalidator }: UndetailledProjectListProps): JSX.Element => {
  const { navigate } = useNavigation();
  const {
    followAssociation, unfollowAssociation, associations,
  } = useContext(AssociationContext);
  const [availablePj, setPj] = useState<(Project | Association)[]>([]);
  const { user } = useContext(AuthContext);
  const [followedProjects, setFollowedProjects] = useState<(Project | Association)[]>();
  const {
    followProject, unfollowProject, projects,
  } = useContext(ProjectsContext);

  const Search = useCallback(({ name, tags }) => {
    const isInTag = tags.map(
      (tag: string) => tag.toLowerCase().includes(query.toLowerCase()),
    ).includes(true);
    const isInName = name.toLowerCase().includes(query.toLowerCase());
    // const isInDesc = description.toLowerCase().includes(query.toLowerCase());
    return isInTag || isInName;
  }, [query]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setFollowedProjects([...user.FollowedProjects, ...user.FollowedAssociation]);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    setPj([...projects, ...associations]);
  }, [setPj, projects, associations]);

  const execValidator = useCallback(
    (item: Project | Association, validator?: FunctionTab): boolean => {
      if (!validator) return false;
      if (validator.length === 0) return true;

      for (let i = 0; i < validator.length; i += 1) {
        if (validator[i](item)) return true;
      }
      return false;
    }, [],
  );

  if (!availablePj) return <></>;
  return (
    <ScrollView>
      {availablePj.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      }).map((project: Project | Association): JSX.Element => {
        const matchNb = followedProjects?.filter(({ id }) => id === project.id);
        const isFavorite = (matchNb?.length ?? 0) > 0;
        const isAssociation = project?.goal;
        if (page === 'search') {
          if (Search(project) && !isFavorite && execValidator(project, fctvalidator)) {
            return (
              <SmallProjectCard
                key={project.title}
                project={project}
                follow={isAssociation ? followProject : followAssociation}
                unfollow={isAssociation ? unfollowProject : unfollowAssociation}
                onPress={(): void => navigate(RoutesNames.PROJECT, { project })}
                favorite={isFavorite}
              />
            );
          }
        }
        if (page === 'favorite') {
          if (Search(project) && isFavorite) {
            return (
              <SmallProjectCard
                key={project.title}
                project={project}
                follow={isAssociation ? followProject : followAssociation}
                unfollow={isAssociation ? unfollowProject : unfollowAssociation}
                onPress={(): void => navigate(RoutesNames.PROJECT, { project })}
                favorite={isFavorite}
              />
            );
          }
        }
        return <View key={project.title}></View>;
      })}
    </ScrollView>
  );
};

export default UndetailledProjectList;
