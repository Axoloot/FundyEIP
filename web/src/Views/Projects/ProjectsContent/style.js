import styled from 'styled-components';

import { margin } from '../../../Components/UI/Common';

export const MainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-bottom: 50px;
  flex-direction: column;
`;

export const ExplorationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
`;

export const LoadingText = styled.h2`
  text-align: center;
`;

export const RecommandationRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const CategorieRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const BackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
  margin-left: 5%;
`;
