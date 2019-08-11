import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 80px;
    padding: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    border-radius: 5px;
`

export default ({ onClick, label }) => (
    <StyledButton onClick={onClick}>
        {label}
    </StyledButton>
)