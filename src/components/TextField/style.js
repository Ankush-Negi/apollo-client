import styled from 'styled-components';

const Value = styled.input`
    border-width: 1px;
    border-color: ${(prop) => (prop.value === '101' ? 'red' : '#ccc')};
    border-radius: 5px;
    background-color: ${(prop) => (prop.value === 'Disabled Input' ? '#ebede4' : 'white')};
    height: 25px;
    width: 100%;
    padding: 1%;
    margin: 0% 5% 0% 0%;
  `;

const Error = styled.p`
  color:red;
  font-size: 17px;
  margin: 2px;
`;

const Text = styled.p`
  font-weight: bold;
`;

export { Value, Error, Text };
