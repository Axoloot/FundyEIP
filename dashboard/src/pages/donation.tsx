import moment from "moment";
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Sidebar from 'src/components/Sidebar';
import { getDonations } from 'src/api/partner';
import NoResources from "../components/noResources";
import {fifthColor} from "../colors";

const Donation = (): JSX.Element => {
  const [dons, setDons] = useState([]);

  const getDonationsFn = async () => {
    const response = await getDonations();
    console.log(response);
    setDons(response);
    // TODO: set donations
  }

  useEffect(() => {
    getDonationsFn();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Content>

      { dons.length > 0 ? (
          <>
          { dons.map((item:any, idx: number) => {
            return (
              <DonationContainer>
              <Row>
              <strong>{item.title} ({item.sourceType}) </strong>{' '} has received a donation of {' '}<strong> {parseFloat(item.amount) / 100}€ </strong>{' '} from {' '}<strong>{item.User.firstname} {item.User.lastname} ({item.User.email})</strong>- {moment(item.createdAt).format('Do YYYY, h:mm:ss a')}</Row>
          </DonationContainer>
            )
          })}</>
        ) : (
          <NoResources title="You don't have a donation yet" />
        )}

      </Content>
    </>
  )
};

const Row = styled.div`
display: flex;
flex-direction: row;

strong {
  margin: 0 5px;
}
`;

const DonationContainer = styled.div`
  width: 700px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${fifthColor};
  border-radius: 20px;
  margin: 5px;
  font-size: 12px;

  img {
      height: 20px;
      width: 20px;
      margin-right: 20px;
  }

  span {
      font-size: 10px;
  }
`;

const Content = styled.div`
  width: calc(100vw - 200px);
  height: calc(100vh - 80px);
  margin-top: 80px;
  margin-left: 250px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px;
  justify-content: center;
  align-items: center;
`;

export default Donation;
