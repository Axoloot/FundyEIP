import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../components/Input';
import Header from '../components/Header';
import Button from '../components/Button';
import { fourthColor, secondColor, thirdColor, mainColor } from "../colors";

import { LogIn } from 'src/api/user';

const Login = (): JSX.Element => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const initialValues = { username: '', password: ''};

  const goToSignUp = () => {
    history.push({
      pathname: "/signup",
    });
  };

  const goToHome = async () => {
    try {
      await LogIn({ email: email, password: password });
      console.log("login ok back!");
    } catch (err) {
      console.log(err);
      toast.error("Wrong credentials, verify your inputs");
      return;
    }
    toast.success("Login successful");
    history.push({
      pathname: "/projects",
    });
  };

  return (
    <>
      <Header />
      <AlignContainer>
        <MainContainer>
          <DescriptionContainer>
            <DescriptionTitle>
              Fundy Dashboard
            </DescriptionTitle>
            <Description>
            Welcome to your <strong>Fundy</strong> dashboard.<br />
            This platform will allow you to create and manage your projects to raise donations on Fundy.
            <br /><br />
            Please <strong>login</strong> to continue.
            <br /><br /><br /><br />
            <strong>Don’t have an account ?</strong>
            <br />
            </Description>

            <ButtonAlign>
              <Button text="Create an account" onClick={goToSignUp} lined />
            </ButtonAlign>

          </DescriptionContainer>
          <FormContainer>
            <Title>Login</Title>
              <>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <FormStyled>
                      <Input name='EmailAddress' text="Email Address" placeholder="Enter your email address" value={email} onChange={(e:any) => {setEmail(e.target.value)}}   />
                      <Input name='Password' text="Password" placeholder="Enter your password" type="password"  value={password} onChange={(e:any) => {setPassword(e.target.value)}}/>
                      <ButtonAlign>
                        <Button type='submit' text="Login" onClick={goToHome} />
                      </ButtonAlign>
                    </FormStyled>
                  )}
                </Formik>
              </>
          </FormContainer>
        </MainContainer>
      </AlignContainer>
    </>
  )
};

export default Login;

const FormStyled = styled(Form)`
`;

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
  width: 500px;
  text-align: center;
  margin-bottom: 40px;
`;

const Description = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: ${fourthColor};
  width: 400px;
  text-align: justify;
  margin-top: 40px;
`;

const DescriptionTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 24px;
  color: ${fourthColor};
  padding-bottom: 15px;
  border-bottom: 2px solid ${fourthColor};
  width: 400px;
`;

const DescriptionContainer = styled.div`
  width: 50%;
  height: 550px;
  background-color: ${secondColor};
  border-radius: 60px 0px 0px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding-left: 55px;
`;

const AlignContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
`;

const MainContainer = styled.div`
  background: ${thirdColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 60px;
  width: 1000px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
