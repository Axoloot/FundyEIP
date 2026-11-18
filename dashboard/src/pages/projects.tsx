import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from 'src/components/Sidebar';
import ProjectCard from 'src/components/projectCard';
import ProjectForm from "../components/projectForm";
import NoResources from "../components/noResources";
import {createProjectAction, getProjects, updateActions, updateProject} from 'src/api/partner';
import ActionCard from "../components/actionCard";
import ActionForm from "../components/actionForm";
import {fifthColor, fourthColor, mainColor, secondColor} from "../colors";
import Button from "../components/Button";

interface HomeProps {
  projects: any,
  setProjects: any,
}

const Projects = ({projects, setProjects}: HomeProps): JSX.Element => {
  const history = useHistory();
  const [idProject, setIdProject] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idAction, setIdAction] = useState(0);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);

  const getProjectsFn = async () => {
    const response = await getProjects();
    setProjects(response);
    // TODO: set donations
  }

  useEffect(() => {
    getProjectsFn();
  }, []);

  const editProject = async (id: string, data: any) => {
    try {
      await updateProject(id, {
        ...data,
        goal: data.donationgoal ? parseFloat(data.donationgoal) : undefined,
        image: data.imgSrc,
      });
      toast.success('Modifications enregistrées!');
      history.go(0);
    } catch (err) {
      toast.error('Une erreur est survenue');
    }
  }

  const editAction = async (id: string, data: any) => {
    try {
      await updateActions(id, {
        ...data,
        image: data.imgSrc,
      });
      toast.success('Modifications enregistrées!');
      history.go(0);
    } catch (err) {
      toast.error('Une erreur est survenue');
    }
  }

  const createAction = async (projectId: string, data: any) => {
    try {
      await createProjectAction(projectId, {
        ...data,
        image: data.imgSrc,
      });
      toast.success('action créée!');
      history.go(0);
    } catch (err) {
      toast.error('Une erreur est survenue');
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Content>
        { projects.length > 0 ? (
          <>
          { projects.map((item:any, idx: number) => {
            return <ProjectCard projects={projects} id={idx} setModalIdx={setIdProject} setModalOpen={setModalOpen}/>
          })}</>
        ) : (
          <NoResources
            title="You don't have a project yet"
            buttonText="Create un Project"
            buttonOnClick={() => {
              history.push({
                pathname: "/create-project",
              })
            }}
          />
        )}
      </Content>
      { isModalOpen && (
        <>
        <BackgroundCover onClick={() => setModalOpen(false)} />
        <Modal>
          <FormContainer>
            <ModalTitle>Edit your projet</ModalTitle>
            <RaisedTitle>{projects[idProject].raisedCurrently}€ / {projects[idProject].goal}€</RaisedTitle>
            <ProjectForm onSubmit={(data: any) => editProject(projects[idProject].id.toString(), data)} initialValues={projects[idProject]} submitText="Editer" />
            {
              projects[idProject].Actions.map((_: any, id: number) => (
                <ActionCard id={id} actions={projects[idProject].Actions} setModalIdx={setIdAction} setModalOpen={setActionModalOpen} />
              ))
            }
            <ButtonAlign>
              <Button type='submit' text="Crate an action"  onClick={() => setIsCreateActionOpen(true)} />
            </ButtonAlign>
          </FormContainer>
        </Modal>
        </>
      )}
      { isActionModalOpen && (
        <>
          <BackgroundCover onClick={() => setActionModalOpen(false)} />
          <Modal>
            <FormContainer>
              <ModalTitle>Editer votre action</ModalTitle>
              <ActionForm onSubmit={(data: any) => editAction(projects[idProject].Actions[idAction].id.toString(), data)} initialValues={projects[idProject].Actions[idAction]} submitText="Edit" />
            </FormContainer>
          </Modal>
        </>
      )}
      { isCreateActionOpen && (
        <>
          <BackgroundCover onClick={() => setIsCreateActionOpen(false)} />
          <Modal>
            <FormContainer>
              <ModalTitle>Créer une action</ModalTitle>
              <ActionForm initialValues={{}} onSubmit={(data: any) => createAction(projects[idProject].id.toString(), data)} submitText="Create" />
            </FormContainer>
          </Modal>
        </>
      )}
    </>
  )
};

const ButtonAlign = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const RaisedTitle = styled.div`
  color: ${secondColor};
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  color: ${mainColor};
  font-size: 28px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
`;

const Modal = styled.div`
  z-index: 3001;
  width: 750px;
  height: 800px;
  overflow-y: scroll;
  background: ${fifthColor};
  border-radius: 25px;
  position: absolute;
  margin: auto;
  top: calc(50vh - 400px);
  left: calc(50vw - 420px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackgroundCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 3000;
`;

const Content = styled.div`
  width: calc(100vw - 200px);
  height: calc(100vh - 80px);
  margin-top: 80px;
  margin-left: 250px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 30px;
`;

export default Projects;
