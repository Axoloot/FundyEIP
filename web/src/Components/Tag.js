import styled from 'styled-components';

const Tag = (props) => {
  return (
    <Container>
      {props.name}
    </Container>
  )
};

const Container = styled.div`
  background: #e15737;
  padding: 3px 5px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 10px;
  margin-right: 10px;
`;

export default Tag;