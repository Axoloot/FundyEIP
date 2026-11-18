import React, { useState, useEffect } from "react";

import { useSnackbar } from "notistack";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import { getMyUser, EditMyuser, updatePicture } from "../../api/user";
import { PostBankCount } from "../../api/account";

import { Slider } from '@material-ui/core';

import AddAccount from '../../Components/AddAccount/index';

import { TextField } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { FormInput } from "../../Components/UI/Form";
import { Button } from "../../Components/UI/Content";
import {
  Text,
  Title,
  MainContainer,
  BodyContainer,
  Lines
} from './style';

export default function EditProfil() {
  const { t  } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [language, setLanguage] = useState('');
  const [rounded, setRounded] = useState(50);
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState("");
  const [modifyProfilPic, setModifyProfilPic] = useState(false);

  const submitUpdate = async () => {
    try {
      let arrondi = rounded / 100;
      await EditMyuser({email, lang: language, firstname, lastname, roundedTo: arrondi, profilePicture: photo});
      window.location.reload();
      enqueueSnackbar("Votre profile a bien été modifé", { variant: "success" });
    } catch(err) {
      enqueueSnackbar("Une erreure est survenue", { variant: "error" });
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyUser();
      setUser(response);
      setFirstname(response.firstname);
      setLastname(response.lastname);
      setEmail(response.email);
      setLanguage(response.lang);
      setRounded(response.roundedTo * 100);
      const url = window.location;
      if (url.search.split('?ref=').length > 1) {
        const addAccountResponse = await PostBankCount({ref: url.search.split('?ref=')[1]});
        if (addAccountResponse.message === 'success') {
          enqueueSnackbar(t('commons.bank_account_sucess_add'), { variant: 'success'});
        }
        else {
          enqueueSnackbar(t('errors.bank_account_error_add'), { variant: 'error'});
        }
        window.location.href = '/EditProfil/';
      }
    }
    fetchData();
  }, [])

  return (
    <BodyContainer>
      <Lines src="/assets/LinesDown.svg" alt="lines" />
      <MainContainer>
        {!modal && (
          <>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Title>{t('editprofil.title')}</Title>
            {/* <SettingsIcon style={{fontSize: 25, position: 'fixed', top: 30, right: 50}} onClick={() => setModifyProfilPic(!modifyProfilPic)}/> */}
          </div>


            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', justifyItems:'center'}}>
              {modifyProfilPic && (
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {photo && <div style={{ marginBottom: 20, backgroundImage: `url(${photo})`, height: 130, width: 130, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: 48 }} />}
                  <TextField
                    style={{ width: '80%' }}
                    type="file"
                    name="image"
                    onChange={(event) => {
                      var file = event.currentTarget.files[0];
                      var reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = async function() {
                        setPhoto(reader.result);
                        await updatePicture(reader.result);
                      }
                    }}
                  />
                </div>
              )}
              {!modifyProfilPic && (
                user && user.profilePicture ? (
                  <div style={{ marginTop: 20, backgroundImage: `url(${user.profilePicture})`, height: 130, width: 130, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: 48, cursor: 'pointer' }} onClick={() => setModifyProfilPic(!modifyProfilPic)} />
                ): (
                  <div style={{ marginTop: 20, width: 130, height: 130, display: 'flex', alignItems: 'center', justifyItems: 'center', textAlign: 'center', cursor: 'pointer', borderRadius: 15, border: 'solid', borderWidth: 1 }} onClick={() => setModifyProfilPic(!modifyProfilPic)}>
                    Ajouter une photo de profile
                  </div>
                )
              )}
              <FormInput style={{ fontSize: 15 }} margin="30px 0px 0px 0px" type="text" value={email} name="email" onChange={e => setEmail(e.target.value)} placeholder="email@address.com" />
              <FormInput style={{ fontSize: 15 }} margin="30px 0px 0px 0px" type="text" value={firstname} name="firstname" onChange={e => setFirstname(e.target.value)} placeholder="Firstname" />
              <FormInput style={{ fontSize: 15 }} margin="30px 0px 0px 0px" type="text" value={lastname} name="lastname" onChange={e => setLastname(e.target.value)} placeholder="Lastname" />
              <FormInput style={{ fontSize: 15 }} margin="30px 0px 0px 0px" type="text" value={language} name="language" onChange={e => setLanguage(e.target.value)} placeholder="Choose language" />
              <Text>{t('editprofil.maximum_rounding')} {rounded}</Text>
              <Slider
                aria-label="Arrondie maximum"
                value={rounded}
                valueLabelDisplay="auto"
                onChange={(e, value) => setRounded(value)}
                step={5}
                marks
                min={5}
                max={100}
              />
              <Button bg="#F1CF73" margin="20px 0px 0px 0px" onClick={() => setModal(true)}>{t('editprofil.add_bank_account')}</Button>
              <Button bg="#F1CF73" margin="20px 0px 0px 0px" onClick={() => history.push('/account')}>{t('editprofil.see_bank_account')}</Button>
              <div style={{ marginTop: "30px", display: 'flex', flex: '1', flexDirection: 'row'}}>
                <Button width="160px" bg="#EB8986" onClick={() => history.push('/Home')}>{t('commons.back')}</Button>
                <Button width="160px" bg="#F1CF73" style={{ marginLeft: 10 }} onClick={() => submitUpdate()}>{t('commons.save')}</Button>
              </div>
            </div>
          </>
        )}
        {modal && (
          <AddAccount user={user} modalHandler={setModal}/>
        )}

      </MainContainer>
    </BodyContainer>
  );
}
