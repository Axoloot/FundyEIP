import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { getMyUser, Logout } from '../../api/user';
import { getAmountFromDB } from '../../utils/bank';
import { useTranslation } from 'react-i18next';

import {
  Header,
  ProfilCard,
  ProfilCardTitle,
  AvatarBubble,
  Avatar,
  Tab,
  ProfilText
} from './style';

const Navbar = ({ toggleDarkMode, darkMode, userLoggin }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [tabIdx, setTabIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState({});
  const [piggyBank, setPiggyBank] = useState(0);

  const cleanProject = () => {
    window.localStorage.removeItem('projectId');
  }

  const renderPiggyBank = () => { return getAmountFromDB(piggyBank)};

  useEffect(() => {
    const fetchData = async() => {
      const userTmp = await getMyUser();
      setPiggyBank(userTmp.piggyBank);
      if (userLoggin && !userTmp) {
        setUser(userLoggin);
      }
      else if (userTmp) {
        window.localStorage.setItem('user', JSON.stringify(userTmp));
        setUser(userTmp);
        setPiggyBank(userTmp.pg.amount)
      }
    };
    fetchData();
    setLoading(false);
  }, [userLoggin]);

  return (
    <>
      {!loading &&  (
        <>
          <Header className='hide-mobile'>
            <img style={{ cursor: "pointer", marginLeft: 0 }} onClick={() => history.push('/Home')} src="https://i.imgur.com/UmUh6C2.png" alt="fundy logo" />
            <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', height: 30, width: 2, marginLeft: 30 }}/>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 30 }}>
              <Tab onClick={() => { setTabIdx(1); cleanProject(); history.push('/Projects') }} isActive={tabIdx === 1}>{t('Projects')}</Tab>
              <Tab onClick={() => { setTabIdx(1); cleanProject(); history.push('/Associations') }} isActive={tabIdx === 1}>{t('Associations')}</Tab>
            </div>
            <Avatar onClick={() => setOpenProfile(!openProfile)} isActive>
              <div style={{ backgroundColor: 'white', marginRight: 20, padding: '5px 15px 5px 10px', borderRadius: 7, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/piggybank.svg" style={{ width: 35, height: 35, marginRight: 5 }}  alt="pg" />
                {renderPiggyBank()}
              </div>
                {user.profilePicture ? (
                  <img src={user.profilePicture} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover' }}  alt="up" />
                  ) : (
                    user.firstname && user.lastname && (
                      <AvatarBubble>
                        <ProfilText>{`${user?.firstname.toUpperCase()[0]}${user?.lastname.toUpperCase()[0]}`}</ProfilText>
                      </AvatarBubble>
                    )
                  )}
            </Avatar>
            <DarkModeSwitch
              style={{ marginLeft: 20 }}
              checked={darkMode}
              onChange={toggleDarkMode}
              size={30}
            />
            {openProfile && (
              <ProfilCard onMouseLeave={() => setOpenProfile(false)}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <AvatarBubble>
                    {user.firstname && user.lastname && (
                      <ProfilText>{`${user?.firstname.toUpperCase()[0]}${user?.lastname.toUpperCase()[0]}`}</ProfilText>
                    )}
                  </AvatarBubble>
                  <div style={{ marginLeft: 10 }}>
                    <ProfilText>{`${user.firstname} ${user.lastname}`}</ProfilText>
                    <ProfilText style={{ paddingLeft: 20}}>{user.email}</ProfilText>
                  </div>
                </div>
                <div style={{ height: 1, width: '90%', marginLeft: '5%', backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 30 }}/>
                <ProfilCardTitle onClick={() => history.push('/EditProfil')}>{t('navbar.myprofil')}</ProfilCardTitle>
                <ProfilCardTitle onClick={() => history.push('/Transaction')}>{t('navbar.seeTransactions')}</ProfilCardTitle>
                <ProfilCardTitle onClick={() => history.push('/Donations')}>{t('navbar.seeDonations')}</ProfilCardTitle>
                <ProfilCardTitle onClick={() => {history.push('/Favoris') }}>{t('navbar.favoris')}</ProfilCardTitle>
                <ProfilCardTitle onClick={() => {Logout(); history.push('/') }}>{t('navbar.logout')}</ProfilCardTitle>
              </ProfilCard>
            )}
        </Header>
        </>
      )}
      {loading && (
        <>
        </>
      )}
      </>
  );
};

export default Navbar;
