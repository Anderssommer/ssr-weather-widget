import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 200px;
    padding: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 5px;
    outline: 0 solid transparent;
    box-sizing: border-box;
    border: 1px solid rgba(200, 200, 200, 1.0);
`

export default ({ value, placeholder, onChange, onEnter }) => (
    <StyledInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
                onEnter()
            }
        }}
    />
)