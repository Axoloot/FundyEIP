import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import { useHistory } from "react-router-dom";
import { LogIn, Register } from 'src/api/user';
import { fourthColor, mainColor, secondColor, thirdColor } from "../colors";

export interface SignUpProps {
  setUser: any,
}

const SignUp = ( { setUser }: SignUpProps ): JSX.Element => {
  const history = useHistory();
  const initialValues = { username: '', password: '', confirmPassword: ''};
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [IBAN, setIBAN] = useState();
  const [address, setAddress] = useState();
  const GoToLogin = () => {
    history.push({
      pathname: '/',
    });
  };

  const handleSignUp = async (username: string, password: string, confirmPassword: string) => {
    try {
      if (password === confirmPassword) {
        // await signup({username, firstname, lastname, type});
      } else {
        toast.error('Please verify your inputs');
      }
    }
    catch {
      toast.error('An error occurred while creating your account');
    }
  };

  const SignupUser = async (errors: any, touched: any) => {
    if (!touched.username || errors.confirmPassword || errors.password || errors.username) {
      toast.error('Please verify your inputs');
      return;
    }
    const newUser = {email: email, password: password, firstname: firstName, lastname: lastName, }
    try {
      await Register(newUser);
      await LogIn({email: email, password: password});
    } catch (e) {
      console.error(e);
    }
    setUser({
      email: email,
      password: password,
      type: 'Association',
      IBAN: IBAN,
      address: address,
    });
    toast.success('Account created! You\'re now logged in');
    history.push({
      pathname: '/',
    });
  };

  return (
    <>
      <Header />
      <AlignContainer>
        <MainContainer>
          <DescriptionContainer>
            <DescriptionTitle>
              Create an Account
            </DescriptionTitle>
            <Description>
            In order to access the functionnalities of your <strong>Fundy</strong><br />
            dashboard, you need to <strong>register</strong> a new account.
            <br /><br />
            Please enter all necessary information to complete the register.
            <br /><br /><br /><br />
            <strong>Already have an account ?</strong>
            <br />
            </Description>

            <ButtonAlign>
              <Button text="Go to login" onClick={GoToLogin} lined />
            </ButtonAlign>

          </DescriptionContainer>
          {/* <ImageContainer /> */}
          <FormContainer>
            <Title>Sign Up</Title>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                handleSignUp(values.username, values.password, values.confirmPassword);
              }}
            >
              {({ errors, touched }) => (
                <FormStyled>
                  <Input name='username' text="Email Address" placeholder="Enter your email address"  value={email} onChange={(e:any) => {setEmail(e.target.value)}}  />
                  <Input name='password' text="Password" placeholder="Enter your password" type="password"  value={password} onChange={(e:any) => {setPassword(e.target.value)}} />
                  <Input name='confirmPassword' text="Confirmation Password" placeholder="Enter your password again" type="password"/>
                  <Input name='firstName' text='First Name' placeholder='Enter your last name' value={firstName} onChange={(e:any) => {setFirstName(e.target.value)}} />
                  <Input name='lastName' text='Last Name' placeholder='Enter your last name' value={lastName} onChange={(e:any) => {setLastName(e.target.value)}}  />
                  <ButtonAlign>
                    <Button type='submit' text="Create Your Account" onClick={() => {
                      SignupUser(errors, touched)
                    }} />
                  </ButtonAlign>
                </FormStyled>
              )}
            </Formik>
          </FormContainer>
        </MainContainer>
      </AlignContainer>
    </>
  )
};

export default SignUp;

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
  height: 700px;
  background: ${secondColor};
  border-radius: 60px 0px 0px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 55px;
  padding-top: 60px;
`;

const AlignContainer = styled.div`
  width: 100%;
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 120px;
  margin-bottom: 30px;
`;

const MainContainer = styled.div`
  background: ${thirdColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 60px;
  width: 1000px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;
