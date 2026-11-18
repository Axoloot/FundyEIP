// import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ProjectCardProps {
  id: number;
  setModalIdx: any;
  setModalOpen: any;
  associations: any;
}

const data = [{
  title: 'Préservation des champs de tulipe',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '80',
  raised2: '8000',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3569&q=80',
},{
  title: 'Projet 2',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '60',
  raised2: '6000',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1641159247660-cee52f9dddae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
},{
  title: 'Projet 3',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '80',
  raised2: '7000',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1640622842924-3ae860f77265?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80',
},{
  title: 'Projet 4',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '10',
  raised2: '1000',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1641155784997-6089335e9579?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
},{
  title: 'Projet 5',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '20',
  raised2: '2000',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1641236709137-c464c3fdff3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
},{
  title: 'Projet 6',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.<br /><br />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare at dolor a fringilla. Sed vitae tempor diam. Cras id faucibus elit. Suspendisse fermentum euismod mi ac bibendum. Nunc placerat auctor ligula non consectetur. Nam non odio quis purus sagittis maximus. Donec volutpat, diam sed interdum laoreet, lorem felis dignissim urna, vitae cursus erat sapien vel lorem.',
  raised: '33',
  raised2: '3333',
  donationGoal: '10000',
  img: 'https://images.unsplash.com/photo-1641283356224-79a4c4a7e768?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
},]

const ProjectCard = ({ id, setModalIdx, setModalOpen, associations }: ProjectCardProps) => {
  return (
    <Container src={associations[id].image} onClick={() => {
      setModalIdx(id);
      setModalOpen(true);
    }}>
    {/* <ImageHeader></ImageHeader> */}
    <TitleContainer>
      {associations[id].title}
      <Description></Description>
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

export default ProjectCard;
