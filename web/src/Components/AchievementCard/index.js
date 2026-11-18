// UI
import { CardImg } from "react-bootstrap";
import {
  LinkCard,
  CardContent,
  CardTitle,
  CardText
} from "../UI/Content/card";

const AchievementCard = ({ achievement }) => {
  return (
    <LinkCard style={{backgroundColor: "whitesmoke", height: "100%"}}>
      <CardContent style={{ height: "100%", gap: "10px" }}>
        <CardImg style={{ borderRadius: 10, marginTop: 5, height: '60%' }} src={ achievement.image } />
        <CardTitle>{achievement.title}</CardTitle>
        <CardText>
          {achievement.description}
        </CardText>
        { achievement.createdAt && (
          <div style={{ height: "25px", fontSize: "15px" }}>
            Le: { new Date(achievement.createdAt).toLocaleDateString("fr-FR") }
          </div>
        )}
      </CardContent>
    </LinkCard>
  );
};

export default AchievementCard;
