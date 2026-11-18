import React from 'react';
import { useHistory } from "react-router-dom";

import { ProgressBar } from 'react-bootstrap';
import { getAmountFromDB } from '../../utils/bank';

import {
  LinkCard,
  CardContent,
  CardTitle,
  CardText
} from "../UI/Content/card";

import {
  ImageContainer, Tag, Tags
} from "../UI/Content";

export const RecommandationProject = ({ data }) => {
  const history = useHistory();
  const manageRedirection = async () => {
    window.localStorage.setItem('projectId', JSON.stringify(data.id));
    history.push(`/Project/${data.id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <LinkCard height="400px" onClick={() => manageRedirection()} >
      <ImageContainer height="180px" minWidth="95px" width={null} bg={"url(" + data.image + ")"}/>
      <CardContent>
        <CardTitle>{data.title}</CardTitle>
        <CardText maxHeight="45px" height="60px">{data.description}</CardText>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <CardText style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>Objectif:
            <div style={{ fontWeight: 'bold', marginLeft: 5 }}>
              {getAmountFromDB(data.goal, 1)}
            </div>
          </CardText>
        </div>
        <ProgressBar className="custom-progress-bar" animated now={Math.round(((data.raisedCurrently / 100) / data.goal) * 100)} label={`${Math.round(((data.raisedCurrently / 100) / data.goal) * 100)}%`} />
        <Tags margin="15px 0px 0px auto">
          { data.isVerified ? <Tag padding="5px 10px 5px 10px" bg="#9CBFFD">Vérifié</Tag> : null }
          { data?.tags?.map((tag) => {
            return ((tag) ? <Tag padding="5px 10px 5px 10px" key={ tag }>{ tag }</Tag> : null);
          })}
        </Tags>
      </CardContent>
    </LinkCard>
  );
}
