import { ToastContainer } from 'react-toastify';
import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Login from './pages/login';
import SignUp from './pages/signup';
import Profile from './pages/profile';
import Projects from './pages/projects';
import Donation from "./pages/donation";
import Associations from './pages/associations';
import CreateProject from './pages/createProject';

import 'react-toastify/dist/ReactToastify.css';
import CreateAssociation from "./pages/createAssociation";

export default function App() {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    setUser({
      email: 'partner@example.org',
      password: '1234567890',
      type: 'Association',
      rna: '1234567890',
      name: 'Demo Association',
      creationDate: '10/02/1998',
      IBAN: 'FR7630006000011234567890189',
      address: 'Rue de la Paix, Paris',
    });
  }, []);
  return (
    <>
    <Switch>
      <Route exact path='/' render={(props) => <Login donations={donations} setDonations={setDonations} {...props} />} />
      <Route exact path='/signup'  render={(props) => <SignUp user={user} setUser={setUser} {...props} />}/>
      {/* <Route exact path='/home' component={Home(projects, setProjects)} /> */}
      <Route exact path='/projects' render={(props) => <Projects projects={projects} setProjects={setProjects} {...props} />}/>
      <Route exact path='/associations' render={(props) => <Associations associations={associations} setAssociations={setAssociations} {...props} />}/>
      {/* <Route exact path='/create' component={Create} /> */}
      <Route exact path='/create-project' render={(props) => <CreateProject projects={projects} setProjects={setProjects} {...props} />} />
      {/* <Route exact path='/profile' component={Profile(user, setUser)} /> */}
      <Route exact path='/profile' render={(props) => <Profile user={user} setUser={setUser} {...props} />} />
      <Route exact path='/donations' render={(props) => <Donation donations={donations} setDonations={setDonations} {...props} />} />
      <Route exact path='/create-association' render={(props) => <CreateAssociation {...props} />} />
    </Switch>
    <ToastContainer />
    </>
  );
}
