import styled from 'styled-components/native';

export const TagContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 0 5px;
`;

export const Tag = styled.View`
  margin-left: 10px;
  height: 30px;
  min-width: 70px;
  margin-right: 10px;
  justify-content: center;
  background-color: white;
  border-radius: 10px
  border-color: #F1CF73;
  border-width: 2px;
  `;

// background-color: rgba(${Math.floor(Math.random() * 255)},
// ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3);
export const TagName = styled.Text`
  font-weight: bold;
  text-align: center;
`;
