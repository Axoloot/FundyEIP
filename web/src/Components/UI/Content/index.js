import styled from 'styled-components';

import {
  color
} from '../Common/text';

import {
  margin,
  padding,
  content,
  background,
  backgroundImage,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight
} from '../Common';

export const BodyContainer = styled.div`
  width: 90%;
  max-width: 90%;
  margin: 5%;
  margin-top: 120px;
  margin-bottom: 50px;
`;

export const SubTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-size: 20px;
  width: fit-content;
  border-radius: 7px;
  font-weight: normal;
  ${margin(null)}
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const Title = styled.div`
  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  width: fit-content;
  border-radius: 7px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export const Content = styled.div`
  ${margin(null)}
  display: flex;
`;

export const ImageContainer = styled.div`
  ${width("100%")}
  ${minWidth(null)}
  ${height("100%")}
  background-position: center;
  background-size: cover;
  border-radius: 7px 7px 7px 7px;
  ${background("#C9C9C9")}
  ${margin(null)}
`;

export const Image = styled.img`
  ${width("100%")}
  ${height("100%")}
  border-radius: 12px;
  ${margin(null)}
`;

export const Button = styled.button`
  ${background("#9cbffd")}
  ${width("fit-content")}

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  text-align: center;

  border-radius: 22px;
  border: none;
  outline: none;

  ${color("#FFFFFF")}

  ${margin("0px 0px 0px 0px")}
  ${padding("10px 30px 10px 30px")}

  &:hover {
    ${background("#F1CF73")}
    box-shadow: 0 2px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    cursor: pointer;
  }
`;

export const BackButton = styled.button`
  ${background(null)}
  ${width("fit-content")}

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;

  text-align: center;

  border-radius: 12px;
  border: none;
  outline: none;

  display: flex;
  flex-direction: row;

  ${margin("0px 0px 0px 0px")}
  ${padding("10px 30px 10px 30px")}

  &:hover {
    ${background("#F1CF73")}
    box-shadow: 0 2px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    cursor: pointer;
  }
`;

export const SearchBackButton = styled.button`
  ${background('rgba(255,186,186,0.8)')}
  ${width("fit-content")}

  font-family: Futura;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  text-align: center;

  border-radius: 10px;
  border: none;
  outline: none;

  display: flex;
  flex-direction: row;

  ${margin("0px 0px 0px 0px")}
  ${padding("5px 20px 5px 20px")}

  &:hover {
    ${background("#F1CF73")}
    box-shadow: 0 2px 10px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 8px );
    -webkit-backdrop-filter: blur( 8px );
    cursor: pointer;
  }
`;

export const Tags = styled.div`
  ${margin("5px 0px 0px 0px")}
  display: flex;
  flex-direction: row;
  align-items: bottom;
  ${content("left")}
`;

export const Tag = styled.div`
  ${background("#F1CF73")}
  ${padding("1px 10px 1px 10px")}
  border-radius: 10px;
  margin-right: 5px;
  &:last-child {
    margin-right: 0px;
  }
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
`;
