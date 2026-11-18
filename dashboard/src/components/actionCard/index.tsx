// import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ProjectCardProps {
  id: number;
  actions: any;
  setModalIdx: any;
  setModalOpen: any;
}

const ActionCard = ({ id, setModalIdx, setModalOpen, actions }: ProjectCardProps) => {
  return (
    <Container src={actions[id].image} onClick={() => {
      setModalIdx(id);
      setModalOpen(true);
    }}>
    {/* <ImageHeader></ImageHeader> */}
    <TitleContainer>
      {actions[id].title}
    </TitleContainer>
    </Container>
  )
};

interface ContainerProps {
  src: string,
}

const Description = styled.div`
  font-size: 10px;
`;

const TitleContainer = styled.div`
  height: 90px;
  font-size: 13px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
  border-radius: 0 0 20px 20px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 15px;
`;

const ImageHeader = styled.div`
  background: url('https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80') center;
  width: 100%;
  height: 100%;
  background-size: cover;
  /* border-radius: 20px 20px 0 0; */
  border-radius: 20px;
`;

const Container = styled.div<ContainerProps>`
  background: ${(props) => `url('${props.src}') center, white`};
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 200px;
  margin: 20px;
  transition: 0.4s all ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 4px solid white;
  box-sizing: border-box;
  padding: 2Opx;

:hover {
  transform: rotate(3deg) scale(1.1);
  transition: 0.4s all ease-in-out;
  cursor: pointer;
}
`;

export default ActionCard;
