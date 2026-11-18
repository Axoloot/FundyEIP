import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { fourthColor, mainColor, thirdColor } from "../../colors";

const Sidebar = (): JSX.Element => {
  const history = useHistory();

  const goHome = () => {
    history.push({
      pathname: '/projects',
    });
  };
  const createProject = () => {
    history.push({
      pathname: '/create-project',
    });
  };
  const goProfile = () => {
    history.push({
      pathname: '/profile',
    });
  };
  const goDonation = () => {
    history.push({
      pathname: '/donations',
    });
  };
  const goAsso = () => {
    history.push({
      pathname: '/associations',
    });
  };
  const goCreateAsso = () => {
    history.push({
      pathname: '/create-association',
    });
  };
  const loggingOut = () => {
    toast.success('You have been logged out.');
    history.push({
      pathname: '/',
    });
  };

  return (
    <Container>
      <Element onClick={goHome}>
        Projects
      </Element>
      <Element  onClick={createProject}>
        Create a Project
      </Element>
      <Element onClick={goAsso}>
        Associations
      </Element>
      <Element onClick={goCreateAsso}>
        Create an Association
      </Element>
      <Element  onClick={goDonation}>
        Donations
      </Element>
      <Element  onClick={goProfile}>
        Profile
      </Element>
      <Logout  onClick={loggingOut}>
        Logout
      </Logout>
    </Container>
  );
};

const Element = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${thirdColor};
  width: 100%;
  color: ${mainColor};
  transition: 0.2s all ease-in-out;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12.5px;

  :hover {
    color: ${mainColor};
    border-bottom: 1px solid ${mainColor};
    transition: 0.2s all ease-in-out;
    padding-left: 20px;
    cursor: pointer;
  }
`;

const Logout = styled(Element)`
  color: #c24444;
  border-bottom: 1px solid #C24444;
  position: fixed;
  bottom: 20px;
  width: 200px;

  :hover {
    background: #C24444;
    color: ${fourthColor};
    border-bottom: 1px solid #C24444;
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 80px;
  border: solid;
  border-width: 0px;
  border-right-width: 2px;
  border-right-color: ${thirdColor};
  background: ${fourthColor};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  height: calc(100vh - 80px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  width: 250px;
  padding: 20px;
  font-size: 14px;
  z-index: 1999;
`;

export default Sidebar;
