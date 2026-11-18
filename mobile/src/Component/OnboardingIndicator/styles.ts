import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Indicator = styled.View<{ color: string }>`
  margin: 5px;
  max-height: 8px;
  min-height: 8px;
  min-width: 12%;
  max-width: 12%;
  border-radius: 5px;
  background: ${({ color }): string => color};
`;
