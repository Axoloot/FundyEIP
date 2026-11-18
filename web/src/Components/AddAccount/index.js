import React, { useState, useEffect } from "react";

import {
  Button,
  RedButton,
  Title,
  BankListContainer,
  SearchInput
} from './style';

import BankCardSmall from "../BankCardSmall";

import Grid from '@material-ui/core/Grid';
import {Skeleton} from '@material-ui/lab/';

import { GetBankList, GetBankLink } from "../../api/account";
import {Oval} from "react-loader-spinner";

export default function AddAccount({user, modalHandler}) {

  const [listBanks, setListBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBanksList, setFilterBanksList] = useState([]);
  const [filter, setFilter] = useState("");

  const manageBank = async (bank) => {
    setLoading(true);
    const link = await GetBankLink({institutionId: bank.id});
    setLoading(false);
    window.location = link;
  }

  const manageSearch = () => {
    setLoading(true); // We are loading
    const tmp = [];
    listBanks.map((bank) => {
      if (bank.name.toLowerCase().includes(filter.toLowerCase())) {
        tmp.push(bank);
      }
    });
    setFilterBanksList(tmp);
    setLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const banks = await GetBankList();
      setListBanks(banks);
      setFilterBanksList(banks);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Title>Ajouter un compte bancaire</Title>
      {loading && (
        <div style={{ width: '100%', height: 450, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Oval
            height={80}
            width={80}
            color="#F1CF73"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="rgba(241,207,115,0.8)"
            strokeWidth={2}
            strokeWidthSecondary={2}

          />
        </div>
      )}
      {!loading && (
        <div style={{display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', justifyItems:'center'}}>
          <>
            <SearchInput
              style={{ width: '60%', fontSize: 15 }}
              placeholder="Chercher une banque (nom ou pays)"
              onChange={(e) => { setFilter(e.target.value); if (filter.length % 2 ) manageSearch()} }
            />
            <BankListContainer>
              {filterBanksList.length > 0 && (
                <Grid container>
                {filterBanksList.map((bank) => {
                  return (
                    <Grid key={bank.id} item xs={2} md={3} ld={4}>
                      <BankCardSmall manageBank={manageBank} data={bank}/>
                    </Grid>
                  )
                })}
              </Grid>
              )}
              { filterBanksList.length <= 0 && (
                <p>Aucun resultat</p>
              )}
            </BankListContainer>
          </>
        <div style={{display: 'flex', flex: '1', flexDirection: 'row'}}>
          <RedButton onClick={() => modalHandler(false)}>Retour</RedButton>
        </div>
      </div>
      )}
    </>
  );
}
