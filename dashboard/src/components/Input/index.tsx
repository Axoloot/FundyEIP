import React from 'react';
import styled from 'styled-components';
import { Field, ErrorMessage } from 'formik';
import {fourthColor, mainColor} from "../../colors";

export interface InputProps {
  text: string,
  name: string,
  placeholder: string,
  type?: 'password' | 'text',
  error?: any,
  touched?: any,
  value?: any,
  onChange?: any,
  disabled?: boolean,
}

const Input = ( { text, name, placeholder, error, touched, value, onChange, type = 'text', disabled = false }: InputProps ): JSX.Element => {
  return (
    <Container>
      <Name>
        {text}
      </Name>
      <Field
        as={Box}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      { !error && touched && (
        <ValidBox>
          ✓
        </ValidBox>
      )}
      { error && touched && (
        <InvalidBox>
          ✗
        </InvalidBox>
      )}
    <ErrorText>
      <ErrorMessage name={name} />
    </ErrorText>
    </Container>
  );
};

const InvalidBox = styled.div`
  background: ${fourthColor};
  width: 20px;
  height: 20px;
  border: 1px solid #EF7070;
  color: #EF7070;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  position: absolute;
  margin: -45px 0px 0px 360px;
`;

const ValidBox = styled.div`
  background: ${fourthColor};
  width: 20px;
  height: 20px;
  border: 1px solid lightgreen;
  color: lightgreen;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: absolute;
  margin: -45px 0px 0px 360px;
`;

const ErrorText = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  color: #EF7070;
  font-size: 10px;
`;

const Name = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  margin: 0px 0px 10px 20px;

  color: ${mainColor};
`;

const Container = styled.div`
`;

const Box = styled.input`
  width: 400px;
  height: 40px;

  background: ${fourthColor};
  border: 1px solid ${fourthColor};
  box-sizing: border-box;
  border-radius: 25px;

  margin-bottom: 15px;

  color: ${mainColor};
  box-sizing: border-box;
  padding-left: 15px;
  transition: all 0.2s;

  font-size: 13px;

  :focus {
    outline: none;
    background: ${fourthColor};
    border: 1px solid ${mainColor};
    transition: all 0.2s;
  }
`;

export default Input;
