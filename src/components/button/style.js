import styled from 'styled-components';

export const Buttons = styled.button`
margin: 10px;
height: 40px;
width: 70px;
border-width: thin;
border-color: black;
border-radius: 4px;
background-color: ${(props) => (!props.disabled && props.value === 'Cancel' ? 'default' : 'default')};
background-color: ${(props) => (!props.disabled && props.value === 'Submit' ? 'green' : '')};
`;
