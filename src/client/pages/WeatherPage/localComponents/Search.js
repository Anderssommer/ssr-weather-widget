import React, { useState } from 'react'
import styled from 'styled-components';
import { Input, Button } from '../../../components'
import { Container } from './InfoRow'

const LoadingContainer = styled.div`
    margin-left: 8px;
`

export default ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const doSearch = () => {
        onSearch(query);
        setQuery('');
    }

    return (
        <Container colored={false} >
            <Input
                value={query}
                placeholder="City"
                onChange={(event) => setQuery(event.target.value)}
                onEnter={doSearch}
            />
            <Button
                label="Search"
                onClick={doSearch}
            />
            {loading &&
                <LoadingContainer>
                    <p>Loading...</p>
                </LoadingContainer>
            }
        </Container>
    )
}