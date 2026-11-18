import React, { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router";

import { getMyUser } from "../../api/user";
import { EnableAccount, DisableAccount } from "../../api/account";

import { Grid } from '@material-ui/core'
import notFound from '../../assets/empty.png';

import {
  Button,
  RedButton,
  Text,
  Title,
  MainContainer,
  BodyContainer,
  RecommandationText
} from './style';

export default function EditProfil() {
  const { t  } = useTranslation();
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeAccount = async (id) => {
    await EnableAccount(id);
    const response = await getMyUser();
    setAccounts(response.bankAccounts)
  }

  const desactiveAccount = async (id) => {
    await DisableAccount(id);
    const response = await getMyUser();
    setAccounts(response.bankAccounts)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyUser();
      setAccounts(response.bankAccounts)
      setLoading(false);
    }
    fetchData();
  }, [])

  return (
    <BodyContainer>
      <MainContainer>
        {!loading && (
          <>
            <Title >{t('account.title')}</Title>
            { accounts.length > 0 && (
              <Text style={{marginBottom: '5%'}}> {t('account.NumberOfAccount')} {accounts.length}</Text>
            )}


            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '50vh', width: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
                {accounts.length === 0 && (
                  <>
                    <div style={{display: 'flex', height: 400, width: 400, justifySelf: 'center', alignSelf: 'center', marginTop: '15%', flexDirection: 'column'}}>
                      <div style={{backgroundImage: `url(${notFound})`, height: '100%', width: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', marginLeft: '7%'}} />
                      <RecommandationText>{t('account.YouDontHaveAccount')}</RecommandationText>
                    </div>
                  </>
                )}
                {accounts.length > 0 && accounts.map((account) => {
                  return (
                    <Grid container spacing={10}>
                        <Grid item xs={4}>
                          <p>{account.institution}</p>
                        </Grid>
                        <Grid item xs={4}>
                          {account.status === 'DISABLED' && (
                            <p>{t('account.state_disable')}</p>
                          )}
                          {account.status === 'ACTIVE' && (
                            <p>{t('account.state_enable')}</p>
                          )}
                        </Grid>
                        <Grid item xs={4}>
                          {account.status === 'ACTIVE' && (
                            <RedButton onClick={() => desactiveAccount(account.id)}>{t('account.disable')}</RedButton>
                          )}
                          {account.status === 'DISABLED' && (
                            <Button onClick={() => activeAccount(account.id)}>{t('account.enable')}</Button>
                          )}
                        </Grid>
                      </Grid>
                  )
                })}
              </div>
              <div style={{display: 'flex', flex: '1', flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%'}}>
                <RedButton onClick={() => history.goBack()}>{t('commons.back')}</RedButton>
              </div>
            </div>
          </>
        )}
        {loading && (
          <p>{t('commons.loading')}</p>
        )}

      </MainContainer>
    </BodyContainer>
  );
}
