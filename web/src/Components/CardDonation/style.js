import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  min-height: 100px;
  border-radius: 12px;
`;

export const TextDonated = styled.div`
  font-family: Futura;
  font-style: normal;
  font-size: 32px;
  text-align: center;
`;

export const TextOrigin = styled.div`
  font-style: normal;
  font-size: 16px;
  text-align: center;
`;

export const Text = styled.div`
  font-style: normal;
  font-size: 16px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ColContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
