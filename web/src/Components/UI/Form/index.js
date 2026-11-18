import styled from 'styled-components';

import {
  height,
  width,
  padding,
  margin
} from '../Common';

import {
  textAlign,
  fontSize
} from '../Common/text';

export const Label = styled.label`

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #000000;
  margin-top: 20px;
  text-transform: uppercase;
  margin-left: 20px;
  margin-bottom: 10px;

@media (prefers-color-scheme: dark) {
  color: #8a8a8a;
}
`;

export const FormInput = styled.input`
  border-radius: 22px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  ${textAlign("center")}
  ${fontSize("12px")}

  ${padding("5px 10px")}
  ${margin("0px 0px 0px 0px")}
  ${width("300px")}
  ${height("40px")}

  @media (prefers-color-scheme: dark) {
    background: #343434;
    color: #8a8a8a;
  }
`;
