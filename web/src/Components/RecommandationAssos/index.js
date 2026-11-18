import React from 'react';
import { useHistory } from "react-router-dom";
import { getAmountFromDB } from '../../utils/bank'
import { ProgressBar } from 'react-bootstrap';

import {
  LinkCard,
  CardContent,
  CardTitle,
  CardText
} from "../UI/Content/card";

import {
  ImageContainer, Tag, Tags
} from "../UI/Content";

export const RecommandationAssos = ({ data }) => {
  const history = useHistory();
  const manageRedirection = async () => {
    history.push(`/Association/${data.id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <LinkCard height="400px" onClick={() => manageRedirection()} >
      <ImageContainer height="180px" minWidth="95px" width={null} bg={"url(" + data.image + ")"}/>
      <CardContent>
        <CardTitle>{data.name}</CardTitle>
        <CardText maxHeight="45px" height="60px">{data.description}</CardText>
        <div style={{ marginTop: 15, marginBottom: 5 }}>
        <CardText margin="10px 0px 0px 0px">{ data.name } à déjà collecté { getAmountFromDB(data.raisedCurrently) } .</CardText>
        </div>
        <Tags margin="30px 0px 0px auto">
          { data.isVerified ? <Tag padding="5px 10px 5px 10px" bg="#9CBFFD">Vérifié</Tag> : null }
          { data?.tags?.map((tag) => {
            return ((tag) ? <Tag padding="5px 10px 5px 10px" key={ tag }>{ tag }</Tag> : null);
          })}
        </Tags>
      </CardContent>
    </LinkCard>
  );
}
