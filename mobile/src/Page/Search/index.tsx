import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';

import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  StyledTextInput,
} from './styles';
import { AuthContext } from '../../Contexts/AuthContext';
import { blackText, darkBackground, whiteBackground } from '../../styles.global';
import FilterView from '../../Component/SearchFilter';
import { FunctionTab } from '../../Hooks/types';
import UndetailledProjectList from '../../Component/UndetailledProjectList';
import { Project, ProjectsContext } from '../../Contexts/ProjectContext';
import { Association } from '../../Contexts/AssociationsContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const validationfiller = (title: string[]): FunctionTab => {
  const mytab: FunctionTab = [];

  const checkAmont0 = (item: Project | Association): boolean => {
    if (item.raisedCurrently === 0) return true;
    return false;
  };
  const checkGoal = (item: Project | Association): boolean => {
    if (item.goal >= 1000) return true;
    return false;
  };

  const checkAmont50 = (item: Project | Association): boolean => {
    if (item.raisedCurrently / item.goal >= 0.5) return true;
    return false;
  };

  const checkAmont20 = (item: Project | Association): boolean => {
    if (item.raisedCurrently / item.goal >= 0.2) return true;
    return false;
  };

  title.forEach((item) => {
    if (item === '0$') mytab.push(checkAmont0);
    if (item === 'Goal > 1000') mytab.push(checkGoal);
    if (item === '50%') mytab.push(checkAmont50);
    if (item === '20%') mytab.push(checkAmont20);
  });

  return mytab;
};

const Search = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const { projects } = useContext(ProjectsContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tab, setTab] = useState<string[] | undefined>();
  const [filters, setFilters] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    const tmp: string[] = [];
    projects.forEach((element) => {
      if (element.image !== null) {
        tmp.push(element.image);
      }
    });
    setTab(tmp);
  }, [projects]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function addFilter(myfilter: string): void {
    if (filters.includes(myfilter)) {
      setFilters(filters.filter((filter) => filter !== myfilter));
    } else {
      setFilters([...filters, myfilter]);
    }
  }

  const theme = {
    mainBackgroundColor: user?.darkmode ? darkBackground : whiteBackground,
    mainTextColor: user?.darkmode ? whiteBackground : blackText,
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ backgroundColor: theme.mainBackgroundColor }}>
        <StyledTextInput
          placeholder="Search a project, an association ..."
          onChangeText={(q: string): void => setQuery(q)}
        />
        <FilterView TagTabName={['0$', '50%', '20%', 'Goal > 1000']} filter={addFilter} />
        <View style={{ height: '90%' }}>
          <UndetailledProjectList
            page="search"
            query={query}
            fctvalidator={validationfiller(filters)}
          />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default Search;
