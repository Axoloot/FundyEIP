import {Form, Formik} from "formik";
import Input from "../Input";
import Button from "../Button";
import React, {useState} from "react";
import styled from "styled-components";
import {fourthColor, mainColor} from "../../colors";

// @ts-ignore
const ActionForm = ({ initialValues, onSubmit, submitText }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [imgSrc, setImgSrc] = useState(initialValues.image || '');
  const [description, setDescription] = useState(initialValues.description || '');

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <FormStyled>
          <Input name='title' text="Title" placeholder="Title of the action"  value={title} onChange={(e:any) => {setTitle(e.target.value)}}  />
          <Label>Description</Label>
          <Textarea name='description' placeholder="Describe your action" value={description} onChange={(e:any) => {setDescription(e.target.value)}} />
          <Input name='imgSrc' text="Cover Picture" placeholder="Paste url"  value={imgSrc} onChange={(e:any) => {setImgSrc(e.target.value)}}  />
          {/* <Button2 type="button" onClick={handleClick}>Import a cover picture</Button2> */}
          <Cover src={imgSrc} />
          <ButtonAlign>
            <Button type='submit' text={submitText} onClick={() => onSubmit({
              title,
              imgSrc,
              description,
            })}/>
          </ButtonAlign>
        </FormStyled>
      )}
    </Formik>
  )
}

export default ActionForm;

const ButtonAlign = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Textarea = styled.textarea`
  width: 400px ;
  height: 150px;

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

const FormStyled = styled(Form)`
  font-size: 13px;
  font-family: 'Open Sans';
`;

interface CoverProps {
  src: string,
}

const Cover = styled.div<CoverProps>`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: ${(props) => props.src.length > 0 ? `url('${props.src}')` : 'rgba(0, 0, 0, 0.1)'};
  background-size: cover;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 4px solid ${fourthColor};
`;

const Label = styled.div`
font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  margin: 0px 0px 10px 20px;

  color: ${mainColor};
`;
