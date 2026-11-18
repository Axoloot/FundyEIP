import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
import { createAssociation } from 'src/api/partner';
import AssociationForm from "../components/associationForm";
import { mainColor } from "../colors";

const CreateAssociation = (): JSX.Element => {
  const history = useHistory();

  const CreateAsso = async (data: any) => {
    try {
      await createAssociation(data);
      toast.success('Association created!');
      history.push('/associations');
    } catch (e) {
      console.error(e);
      toast.error('Une erreur est survenue!');
    }
    //   setUser({
    //     email: email,
    //     password: password,
    //     type: 'Association',
    //     rna: rna,
    //     name: assoName,
    //     creationDate: creationDate,
    //     IBAN: IBAN,
    //     address: address,
    //   });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Content>
        <FormContainer>
          <Title>Create an Association</Title>
          <AssociationForm initialValues={{}} onSubmit={CreateAsso} submitText="Create" />
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
  // margin-left: 50px;
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

export default CreateAssociation;
