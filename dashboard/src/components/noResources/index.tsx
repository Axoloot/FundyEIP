import NoResourcesSvg from '../../assets/no-resources.svg';
import Button from "../Button";
import { mainColor } from "../../colors";

export interface NoResourcesProps {
  title: string,
  buttonText?: string,
  buttonOnClick?: () => void,
}

const NoResources = ({ title, buttonText, buttonOnClick }: NoResourcesProps) => (
  <div style={{
    width: '90%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  }}>
    <div style={{ color: mainColor, fontSize: 20, fontWeight: 'bold', marginBottom: 50 }}>
      {title}
    </div>
    <img src={NoResourcesSvg} alt="no-resources" style={{ width: 200, height: 200, marginBottom: 50 }} />
    {
      buttonText && (
        <Button text={buttonText} onClick={buttonOnClick} />
      )
    }
  </div>
);

export default NoResources;
