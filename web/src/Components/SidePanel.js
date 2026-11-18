import styled from 'styled-components';

const SidePanel = (props) => {
  return (
    <Container show={props.show}>
      {props.children}
    </Container>
  )
};

const Container = styled.div`
  height: calc(100vh - 60px);
  width: 420px;
  position: absolute;
  right: 0px;
  top: 60px;
  background: #FFFFFF;
  box-shadow: -2px 4px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
  opacity: ${(props) => props.show ? '1' : '0'};
  overflow: auto;
  height: ${(props) => props.show ? '100%' : '0'};
  transition: opacity 0.5s ease-out;
  @media (prefers-color-scheme: dark) {
    background: #343434;
    color: #8a8a8a;
  }
`;

export default SidePanel;
