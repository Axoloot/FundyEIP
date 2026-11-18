import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from 'src/components/Sidebar';
import NoResources from "../components/noResources";
import AssociationForm from "../components/associationForm";
import AssociationCard from 'src/components/associationCard';
import {
  getAssociations,
  updateAssociation,
  createAssociationAction,
  updateActions,
} from 'src/api/partner';
import {fifthColor, mainColor, secondColor} from "../colors";
import ActionForm from "../components/actionForm";
import ActionCard from "../components/actionCard";
import Button from "../components/Button";

interface HomeProps {
  associations: any,
  setAssociations: any,
}

const Home = ({associations, setAssociations }: HomeProps): JSX.Element => {
  const history = useHistory();
  const [idAction, setIdAction] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [idAssociation, setIdAssociation] = useState(0);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isCreateActionOpen, setIsCreateActionOpen] = useState(false);

  const getAssociationsFn = async () => {
    const response = await getAssociations();
    setAssociations(response);
    // TODO: set donations
  }

  useEffect(() => {
    getAssociationsFn();
  }, []);

  const editProject = async (id: string, data: any) => {
    try {
      await updateAssociation(id, {
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


  const createAction = async (assoId: string, data: any) => {
    try {
      await createAssociationAction(assoId, {
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
        { associations.length > 0 ? (
          <>
          { associations.map((item:any, idx: number) => {
            return <AssociationCard associations={associations} id={idx} setModalIdx={setIdAssociation} setModalOpen={setModalOpen}/>
          })}</>
        ) : (
          <NoResources
            title="You don't have an association yet"
            buttonText="Crate an Association"
            buttonOnClick={() => {
              history.push({
                pathname: "/create-association",
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
              <ModalTitle>Editer votre association</ModalTitle>
              <RaisedTitle>{associations[idAssociation].raisedCurrently}€ Raised</RaisedTitle>
              <AssociationForm onSubmit={(data: any) => editProject(associations[idAssociation].id.toString(), data)} initialValues={associations[idAssociation]} submitText="Editer" />
              {
                associations[idAssociation].Actions.map((_: any, id: number) => (
                  <ActionCard id={id} actions={associations[idAssociation].Actions} setModalIdx={setIdAction} setModalOpen={setActionModalOpen} />
                ))
              }
              <ButtonAlign>
                <Button type='submit' text="Create an action"  onClick={() => setIsCreateActionOpen(true)} />
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
              <ActionForm onSubmit={(data: any) => editAction(associations[idAssociation].Actions[idAction].id.toString(), data)} initialValues={associations[idAssociation].Actions[idAction]} submitText="Edit" />
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
              <ActionForm initialValues={{}} onSubmit={(data: any) => createAction(associations[idAssociation].id.toString(), data)} submitText="Create" />
            </FormContainer>
          </Modal>
        </>
      )}
    </>
  )
};

const RaisedTitle = styled.div`
  color: ${secondColor};
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonAlign = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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


interface ColumnProps {
  width?: string,
}


interface ContainerProps {
  src: string,
}

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

export default Home;
