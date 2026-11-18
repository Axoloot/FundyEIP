import React, { useEffect, useState } from "react";

import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import { CardTransaction } from '../../Components/CardTransaction';

import { getUserTransaction } from "../../api/account";

import notFound from '../../assets/empty.png';
import { Grid } from "@material-ui/core";
import {
  Title,
  MainContainer,
  BodyContainer,
  Text,
} from './style';
import {
  Button
} from "../../Components/UI/Content";

export default function EditProfil() {
  const { t  } = useTranslation();
  const [list, setList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserTransaction();
      setList(response);
    }
    fetchData();
  }, [])

  return (
    <BodyContainer>
      <MainContainer>
        <Title style={{ marginTop: '4%' }}>{t('transaction.title')}</Title>
        <Text>{t('transaction.number')} {list.length} {t('transaction.transactions')}</Text>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', overflowY: 'auto', marginTop: 40, marginBottom: 20 }}>
          {list.length > 0 && (
            list.map((project) => {
              return (
                <div style={{ width: 350, marginTop: 5 }}>
                  <div style={{ width: '90%', height: 2, marginLeft: '5%', borderRadius: 5, backgroundColor: '#bcbcbc' }} />
                  <CardTransaction data={project}/>
                </div>
              )
            })
          )}
          {list.length === 0 && (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '5%'}}>
              <img src={notFound} alt="not found" style={{ width: 300, height: 200 }}/>
            </div>
          )}
        </div>
        <Button style={{ marginTop: 'auto', marginBottom: '3%'}} bg="#EB8986" onClick={() => history.push('/Home')}>{t('commons.back')}</Button>
      </MainContainer>
    </BodyContainer>
  );
}
