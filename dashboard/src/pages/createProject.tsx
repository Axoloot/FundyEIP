import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
import { createProject } from 'src/api/partner';
import ProjectForm from "../components/projectForm";
import {mainColor} from "../colors";

const CreateProject = (): JSX.Element => {
  const history = useHistory();
  const initialValues = { name: '', description: '', donationgoal: '', donationcurrency: '', cover: ''};

  const createProjectFn = async (data: { name: string, description: string, currency: string, donationgoal: string, title: string, imgSrc: string }) => {
    const newProject = {
      title: data.name,
      desc: data.description,
      img: data.imgSrc,
      raised: 0,
      raised2: 0,
      currency: data.currency,
      donationGoal: parseFloat(data.donationgoal),
      date: '06/05/2022',
      latitude: 0,
      longitude: 0,
    };
    const newProjectBack = {
      email: `${data.name}@fundy.com`,
      name: data.name,
      description: data.description,
      title: data.title,
      goal: parseFloat(data.donationgoal),
      image: data.imgSrc,
      tags: [],
      longitude: 0,
      latitude: 0,
    }
    try {
      await createProject(newProjectBack);
      console.log('project created!');
    } catch (e) {
      console.error(e)
    }
    console.log(newProject);
    // setProjects([...projects, newProjectBack]);
    toast.success('Project has been created!');
    history.push({
      pathname: '/projects',
    });
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Content>

        <FormContainer>
          <Title>Creating a new Project</Title>
          <ProjectForm onSubmit={createProjectFn} initialValues={initialValues} submitText="Create" />
        </FormContainer>
      </Content>
    </>
  )
};

const Title = styled.div`
  color: ${mainColor};
  font-size: 28px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
`;

const Content = styled.div`
  width: calc(90vw - 250px);
  margin-top: 80px;
  margin-left: 250px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
`;

export default CreateProject;
