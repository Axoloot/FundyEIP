import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import {
  ArrowLeft,
  ArrowRight,
  Button,
  Index,
  Indexes,
  Lines,
  Description,
  Title,
  Header,
  MainContainer,
  BodyContainer,
} from './style';

const infos = [
  { title: 'Gather all your accounts', img: '/assets/Onboarding1.svg', desc: 'With Fundy, all your billing accounts are gathered in the same place. You can keep an eye on all your spendings, all within a single app.' },
  { title: 'Round up your payments', img: '/assets/Onboarding2.svg', desc: 'Each centim counts! Round up your paiements to save money.  No worries! You are in full control and can decide whenever you want how to limit your spendings.' },
  { title: 'Help the community', img: '/assets/Onboarding3.svg', desc: 'Be a buddy! With the money you saved, you can choose projects to help finance. Fundy is the crowdfunding application to help individuals and associations complete their projects.' },
]

const Onboarding = () => {
  const { t  } = useTranslation();
  const [index, setIndex] = useState(0);

  return (
    <BodyContainer>
      <Lines src="/assets/LinesDown.svg" alt="lines" />
      <Header>
        <img src="https://i.imgur.com/UmUh6C2.png" alt="fundy logo" />
      </Header>
      <MainContainer>
        { index !== 0 && (
          <ArrowLeft onClick={() => {
            let newIdx = index - 1;
            if (newIdx < 0) {
              newIdx = 0;
            }
            setIndex(newIdx);
          }}>
            <img src="/assets/arrowleft.svg" alt="arrow left" />
          </ArrowLeft>
        )}
        { index !== 2 && (
          <ArrowRight id="right-arrow" onClick={() => {
            let newIdx = index + 1;
            if (newIdx > 2) {
              newIdx = 2;
            }
            setIndex(newIdx);
          }}>
          <img src="/assets/arrowright.svg" alt="arrow right" />
        </ArrowRight>
        )}
        <img src={infos[index].img} alt="onboarding" />
        <Title>{infos[index].title}</Title>
        <Description>
          {infos[index].desc}
        </Description>
        { index === 2 && (
          <a href="/home"><Button>{t('Got it')}!</Button></a>
        )}
        <Indexes>
          <Index isActive={index === 0} />
          <Index isActive={index === 1} />
          <Index isActive={index === 2} />
        </Indexes>
      </MainContainer>
    </BodyContainer>
  );
}

export default Onboarding;
