import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Profile = ({navigation}) => {
  const history = useHistory();
  const [isDarkMode, setToDarkMode] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      const response = JSON.parse(window.localStorage.getItem('user'));
      setUser(response);
    };
    fetchData();
    setLoading(false);
  }, [])

  return (
    <Container>
      {!loading && (
        <>
          {user.profilePicture && (
            <img src={user.profilePicture} alt="user avatar" />
          )}
          {!user.profilePicture && (
            <UserAvatar>{user.firstname[0].toUpperCase()}{user.lastname[0].toUpperCase()}</UserAvatar>
          )}
          <Username>{user.firstname} - {user.lastname}</Username>
          <Email>{user.email}</Email>
          {user.trueLayerAccessToken && (
            <ButtonDisabled disabled onClick={() => {history.push('/addCard')}}>You already have an account</ButtonDisabled>
          )}
          {!user.trueLayerAccessToken && (
            <Button onClick={() => {history.push('/addCard')}}>Add a card</Button>
          )}
          {/* <Button2 isActive={isDarkMode} onClick={() => setToDarkMode(!isDarkMode)}>Set to {isDarkMode ? 'light mode' : 'dark mode'}</Button2> */}
          <Button onClick={() => {history.push('/EditProfil')}}>Edit profil</Button>
        </>
      )}
      {loading && (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

const Button2 = styled.button`
  background: ${(props) => props.isActive ? '#F1CF73' : '#ccc'};
  width: 160px;
  height: 45px;
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
  margin-top: 40px;
  cursor: pointer;
  @media (prefers-color-scheme: dark) {
    background: #b65f35;
    color: #dadada;
  }
`;

const ButtonDisabled = styled.button`
  background: #A3BFF7;
  width: 160px;
  height: 45px;
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
  margin-top: 40px;
  cursor: pointer;
`;

const UserAvatar = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  background-color: lightgreen;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

const Button = styled.button`
  background: ${(props) => props.isActive ? '#F1CF73' : '#ccc'};
  width: 160px;
  height: 45px;

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;

  text-align: center;

  color: #FFFFFF;
  border-radius: 22px;
  outline: none;
  border: none;
  margin-top: 40px;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    background: #b65f35;
    color: #dadada;
  }
`;

const Username = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
`;

const Email = styled.div`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 1px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding: 30px 20px;
`;

export default Profile;
