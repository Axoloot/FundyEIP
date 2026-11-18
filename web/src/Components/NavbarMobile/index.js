import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { getMyUser, Logout } from '../../api/user';
import piggyBankSvg from '../../assets/piggybank.svg';
import { useTranslation } from 'react-i18next';
import { Turn as Hamburger } from 'hamburger-react'

const Navbar = ({ toggleDarkMode, darkMode, userLoggin, openResponsiveModal }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [tabIdx, setTabIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [user, setUser] = useState({});
  const [piggyBank, setPiggyBank] = useState("");

  const cleanProject = () => {
    window.localStorage.removeItem('projectId');
  }

  const renderPiggyBank = () => { return (piggyBank / 100) };

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
      }
    };
    fetchData();
    setLoading(false);
  }, [userLoggin]);

  return (
    <>
      {!loading &&  (
        <>
          <div className='hide-desktop' style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', width: '100%', paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
            <img style={{ cursor: "pointer", marginLeft: 0, width: '50%' }} onClick={() => history.push('/Home')} src="https://i.imgur.com/UmUh6C2.png" alt="fundy logo" />
            <div style={{ backgroundColor: 'white', marginRight: 20, padding: '5px 15px 5px 10px', borderRadius: 7, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/piggybank.svg" style={{ width: 35, height: 35, marginRight: 5 }}  alt="pg" />
              {renderPiggyBank()}€
            </div>
            <Hamburger onToggle={() => openResponsiveModal(true)} toggled={false}/>
          </div>
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
