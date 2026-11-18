import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import {
  Title,
  Author,
  Desc,
  PercentageBar,
  PercentageNb,
  ImageHeader,
  Container
} from './style'

export const SmallCard = ({ data }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const imageUrl = `url('${data.image}')`;
  const percentage = `${data.raisedPercentage}%`;

  const manageRedirection = async () => {
    window.localStorage.setItem('projectId', JSON.stringify(data.id));
    history.push(`/Project/${data.id}`);
  }

  return (
    <Container onClick={() => manageRedirection()}>
      <ImageHeader bg={imageUrl} />
      <PercentageBar percent={percentage}><div></div></PercentageBar>
      <PercentageNb>{data.raisedPercentage}% {t('raised')}</PercentageNb>
      <Title>{data.title}</Title>
      <Author>{data.email}</Author>
      <Desc>
        <strong>{data.raisedCurrently}€ {t('raised out')} {data.goal}€</strong><br />
        {t('You already donated')}<strong>xxxx€</strong><br /><br />
        <p>{data.description}</p>
      </Desc>
    </Container>
  );
};

export default SmallCard;
