import React from 'react'
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px 12px 0px 12px;
    background-color: ${props => props.colored ? '#D6EBF6' : 'white'};
    color: ${props => props.colored ? '#2E6D8C' : '#31343D'};
    border: 1px solid #D6EBF6;
    align-items: center;
`

export default ({ label, value, colored, unit }) => (
    <Container colored={colored}>
        <p>{label} <strong>{value}{unit}</strong></p>
    </Container>
)