import React from "react";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Home from './Views/Home/index';
import Login from './Views/Login/index';
import Register from './Views/Register/index';
import Onboarding from './Views/Onboarding/index';
import EditProfil from './Views/EditProfil/index';
import DetailledProject from './Views/DetailledProject';
import DetailledAssociation from './Views/DetailledAssociation';
import ListAccount from './Views/ListAccount';
import Projects from './Views/Projects';
import ListAssociations from './Views/ListAssociations';
import Favoris from './Views/Favoris';
import Transaction from './Views/Transaction';
import Forgot from './Views/Forgot';
import ResetPassword from './Views/Reset';
import Navbar from "./Components/Navbar";
import NavbarMobile from './Components/NavbarMobile';
import ResponsiveModal from './Components/NavbarMobile/modal';
import Donations from "./Views/Donations";
import DemoBanner from "./Components/DemoBanner";

export default function App({ toggleDarkMode, darkMode, history }) {
  const [user, setUser] = useState({});
  const [responsiveModal, openResponsiveModal] = useState(false);

  return (
    <>
    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} userLoggin={user} />
    {!responsiveModal && (
      <NavbarMobile toggleDarkMode={toggleDarkMode} darkMode={darkMode} userLoggin={user} openResponsiveModal={openResponsiveModal} />
    )}
    {responsiveModal && (
      <ResponsiveModal toggleDarkMode={toggleDarkMode} darkMode={darkMode} userLoggin={user} openResponsiveModal={openResponsiveModal} />
    )}
    <Switch>
      <Route exact path='/' component={() => <Login history={history} setUserLogin={setUser} />} />
      <Route exact path='/Register'  component={() => <Register history={history} setUserLogin={setUser} />} />
      <Route exact path='/Forgot'  component={() => <Forgot history={history} />} />
      <Route exact path='/ResetPassword/:token'  component={() => <ResetPassword history={history} />} />
      <Route path="/Home" exact component={Home} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/projects/:id" component={DetailledProject} />
      <Route path="/project/:id" component={DetailledProject} />
      <Route path="/associations" exact component={ListAssociations} />
      <Route path='/Association/:id' exact component={DetailledAssociation} />
      <Route path='/Associations/:id' exact component={DetailledAssociation} />
      <Route path="/favoris" exact component={Favoris} />
      <Route path="/transaction" exact component={Transaction} />
      <Route path="/donations" exact component={Donations} />
      <Route path="/account" exact component={ListAccount} />
      <Route path="/editprofil" exact component={EditProfil} />
    </Switch>
    <DemoBanner />
    </>
  );
}
