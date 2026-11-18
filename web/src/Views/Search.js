import { useState } from 'react';

import { InputGroup, FormControl} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Card from '../Components/BigCard';
import Container from '../Components/Container';
import ProjectCard from '../Components/ProjectCard';

export default function About() {
  const [input, setInput] = useState('');
  const { t, i18n } = useTranslation();
    return (
      <div>
        <Container>
          <Card>
            <InputGroup className="mb-3">
              <FormControl
                onChange={e => setInput(e.target.value)}
                placeholder={t('Search projects')}
              />
            </InputGroup>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <div style={{height: 450, width: 350}}>
                <ProjectCard  />
              </div>
              <div style={{height: 450, width: 350}}>
                <ProjectCard  />
              </div>
              <div style={{height: 450, width: 350}}>
                <ProjectCard  />
              </div>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
