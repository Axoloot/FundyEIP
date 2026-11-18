import {Form, Formik} from "formik";
import Input from "../Input";
import Button from "../Button";
import React, {useState} from "react";
import styled from "styled-components";
import {fourthColor, mainColor} from "../../colors";

// @ts-ignore
const AssociationForm = ({ initialValues, onSubmit, submitText }) => {
  const [email, setEmail] = useState(initialValues.email || '');
  const [assoName, setAssoName] = useState(initialValues.name || '');
  const [title, setTitle] = useState(initialValues.title || '');
  const [desc, setDesc] = useState(initialValues.description || '');
  const [imgSrc, setImgSrc] = useState(initialValues.image || '');
  const [lng, setLng] = useState(initialValues.longitude || '');
  const [lat, setLat] = useState(initialValues.latitude || '');

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <FormStyled>
          <Input name='email' text="Email Address" placeholder="Enter your email address"  value={email} onChange={(e:any) => {setEmail(e.target.value)}}  />
          <Input name='name' text='Association Name' placeholder='Enter the name'  value={assoName} onChange={(e:any) => {setAssoName(e.target.value)}}/>
          <Input name='image' text='Image url' placeholder='Enter the image url'  value={imgSrc} onChange={(e:any) => {setImgSrc(e.target.value)}}/>
          <Cover src={imgSrc} />
          <Input name='title' text="Title" placeholder="Title of the asso"  value={title} onChange={(e:any) => {setTitle(e.target.value)}}  />
          <Label>Description</Label>
          <Textarea name='description' placeholder="Describe your asso" value={desc} onChange={(e:any) => {setDesc(e.target.value)}} />
          <Input name='longitude' text='longitude' placeholder='Your coordinate (lng)' value={lng} onChange={(e:any) => {setLng(e.target.value)}}/>
          <Input name='latitude' text='latitude' placeholder='Your coordinate (lat)' value={lat} onChange={(e:any) => {setLat(e.target.value)}}/>
          <ButtonAlign>
            <Button type='submit' text={submitText} onClick={() => onSubmit({
              email: email,
              name: assoName,
              description: desc,
              image: imgSrc,
              title: title,
              longitude: parseFloat(lng),
              latitude: parseFloat(lat),
            })} />
          </ButtonAlign>
        </FormStyled>
      )}
    </Formik>
  )
}

export default AssociationForm;

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

const Hint = styled.div`
  font-size: 12px;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 10px;
  margin-top: -10px;
  margin-left: 10px;
`;

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

  color: black;
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

const Label = styled.div`
font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  margin: 0px 0px 10px 20px;

  color: ${mainColor};
`;
