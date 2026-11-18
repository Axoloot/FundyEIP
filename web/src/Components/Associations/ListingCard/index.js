// UI
import {
  LinkCard,
  CardContent,
  CardTitle,
  CardText
} from "../../UI/Content/card";
import {
  Tags,
  Tag,
  ImageContainer
} from "../../UI/Content";
import { useHistory } from "react-router-dom";

const AssociationListingCard = ({ association }) => {
  const history = useHistory();

  return (
    <LinkCard height="400px" onClick={() => history.push(`/Association/${association.id}`)}>
      <ImageContainer height="180px" minWidth="95px" width={null} bg={"url(" + association.image + ")"}/>
      <CardContent>
        <CardTitle>{association.name}</CardTitle>
        <CardText maxHeight="73px" height="90px">
          {association.description}
        </CardText>
        <Tags margin="30px 0px 0px auto">
          {association.tags.map((tag) => {
            return ((tag) ? <Tag key={ tag } style={{ background: '#9cbffd' }}>{ tag }</Tag> : null);
          })}
        </Tags>
      </CardContent>
    </LinkCard>
  );
};

export default AssociationListingCard;
