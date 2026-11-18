/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-parens */
import styled from 'styled-components/native';

export const DescriptionInput = styled.TextInput`
  justify-content: center;
  align-content: flex-start;
  padding-left: 20px;
  text-align: justify;
  display: flex;
`;

export const BackgroundView = styled.View`
  background-color: ${props => props.theme.mainBackgroundColor ?? 'black'};
`;

export const ScrollContainer = styled.ScrollView`
  width: 100%;
  align-content: center;
  margin-top: 50px;
  background-color: ${props => props.theme.mainBackgroundColor ?? 'black'};
`;
// background-color: ${(props) => (props.color ? whiteBackground : darkBackground)};

export const AddAccountModal = styled.View`
  background-color: whitesmoke;
  height: 200px;
  width: 300px;
  align-self: center;
  align-items: center;
  justify-content: space-around;
  display: flex;
  border-radius: 15px;
`;

// ScrollContainer.defaultProps = {
//   theme: {
//     main: 'palevioletred',
//   },
// };
