import {Form, Formik} from "formik";
import Input from "../Input";
import Button from "../Button";
import React, {useState} from "react";
import styled from "styled-components";
import { fourthColor, mainColor } from "../../colors";

// @ts-ignore
const ProjectForm = ({ initialValues, onSubmit, submitText }) => {
  const [coverPic, setCoverPic] = useState('No cover pic imported');
  const [imgSrc, setImgSrc] = useState(initialValues.image || '');
  const [currency, setCurrency] = useState(initialValues.currency || 'euro');
  const [donationgoal, setDonationgoal] = useState(initialValues.goal || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [title, setTitle] = useState(initialValues.title || '');
  const [name, setName] = useState(initialValues.name || '');

  const handleChange = (e:any) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCoverPic('Cover pic imported!');
      setImgSrc(url);
    }
  };

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
          <Input name='username' text="Project Name" placeholder="Name of your project"  value={name} onChange={(e:any) => {setName(e.target.value)}}  />
          <Input name='title' text="Title" placeholder="Title of the project"  value={title} onChange={(e:any) => {setTitle(e.target.value)}}  />
          <Label>Description</Label>
          <Textarea name='description' placeholder="Describe your project" value={description} onChange={(e:any) => {setDescription(e.target.value)}} />
          <Input name='goal' text="Donation Goal" placeholder="Goal" value={donationgoal} onChange={(e:any) => {setDonationgoal(e.target.value)}}   />
          <Label>Donation Goal Currency</Label>
          <Select value={currency} onChange={(e:any) => { setCurrency(e.target.value)}}>
            <option value="euro">EUR €</option>
            <option value="dollar">USD $</option>
          </Select>
          <Input name='imgSrc' text="Cover Picture" placeholder="Paste url"  value={imgSrc} onChange={(e:any) => {setImgSrc(e.target.value)}}  />
          {/* <Button2 type="button" onClick={handleClick}>Import a cover picture</Button2> */}
          <Cover src={imgSrc} />
          {/* {coverPic} */}

          {/* <input
                  type="file"
                  name="import"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                /> */}
          <ButtonAlign>
            <Button type='submit' text={submitText} onClick={() => onSubmit({
              coverPic,
              imgSrc,
              currency,
              donationgoal,
              description,
              title,
              name,
            })} />
          </ButtonAlign>
        </FormStyled>
      )}
    </Formik>
  )
}

export default ProjectForm;

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

const Select = styled.select`
  width: 100px ;
  height: 40px;

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
