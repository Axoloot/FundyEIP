import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from 'src/components/Sidebar';
import { getMyUser, EditMyuser } from 'src/api/user';
import {mainColor} from "../colors";

interface ProfileProps {
  user: any,
  setUser: any,
}

const Profile = ({user, setUser}: ProfileProps): JSX.Element => {
  const initialValues = {
    name: '',
  };
  const [email, setEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');

  const editProfile = async () => {
    try {
      const response = await EditMyuser({ email, firstname, lastname });
      setUsername(`${firstname} ${lastname}`)
      toast.success('Modification enregister !');
    } catch (err) {
      toast.error('Une erreur est survenue !');
    }
  }

  useEffect(() => {
  const getUser = async () => {
    const response = await getMyUser();
    console.log(response);
    setUsername(`${response.firstname} ${response.lastname}`);
    setFirstname(response.firstname);
    setLastname(response.lastname);
    setEmail(response.email);
    // TODO: set Associations
  }
    getUser();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Container>
        <Content>
        <Title>{username} </Title>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Input
                name="firstname"
                text="Firstname"
                placeholder=""
                value={firstname}
                onChange={(e:any) => setFirstname(e.target.value)}
              />
              <Input
                name="lastname"
                text="Lastname"
                placeholder=""
                value={lastname}
                onChange={(e:any) => setLastname(e.target.value)}
              />
              <Input
                name="email"
                text="Email"
                placeholder=""
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
              />
              <ButtonAlign>
                <Button type='submit' text="Edit profile" onClick={editProfile} />
              </ButtonAlign>
            </Form>
          )}
        </Formik>
        </Content>
      </Container>
    </>
  );
};

const ButtonAlign = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Title = styled.div`
  color: ${mainColor};
  font-size: 28px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: calc(100vw - 200px);
  height: calc(100vh - 80px);
  margin-top: 80px;
  margin-left: 250px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 30px;
`;

export default Profile;
