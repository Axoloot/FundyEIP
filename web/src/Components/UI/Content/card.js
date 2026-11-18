import styled from 'styled-components';

import {
  padding,
  margin,
  width,
  height,
  maxHeight
} from '../Common';

export const Card = styled.div`
  ${maxHeight(null)}
  ${padding("15px")}
  ${margin(null)}
  ${width("100%")}
  ${height(null)}
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: top;
  justify-content: left;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 10px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 8px );
  -webkit-backdrop-filter: blur( 8px );
`;

export const LinkCard = styled.div`
  ${maxHeight(null)}
  ${margin(null)}
  ${width("100%")}
  ${height(null)}
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: top;
  border-radius: 10px;
  background: #f3f2f2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:hover {
    background: #fdfcfc;
    box-shadow: 0 2px 10px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    cursor: pointer;
  }
`;

export const CardContent = styled.div`
  ${width("100%")}
  display: flex;
  padding: 10px 25px 10px 25px;
  flex-direction: column;
  align-items: top;
  justify-content: left;
`;

export const CardTitle = styled.h5`
  margin-bottom: 0px;
  font-family: Futura;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #000000;
`;

export const CardText = styled.div`
  font-size: 15px;
  ${maxHeight(null)}
  ${height(null)}
  ${margin(null)}
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  flex-grow: 1;
  overflow: hidden;
  color: #000000;
`;
