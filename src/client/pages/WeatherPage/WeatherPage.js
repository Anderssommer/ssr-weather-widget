import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { InfoRow, Search } from './localComponents'
import styled from 'styled-components';
import { requestWeatherDataAsync } from './weatherPageActionCreators'
import queryString from 'query-string'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
    padding: 50px;
    background-color: gray;
    flex: 1;
`

const WeatherContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 5px;
    overflow: hidden;
`

const WeatherPage = ({ weatherData, city, errorMessage, requestingWeatherData, requestWeatherDataAsync, cityQuery, history }) => {
    useEffect(() => {
        requestWeatherDataAsync({ cityQuery })
    }, [requestWeatherDataAsync, cityQuery])

    const { temperature, humidity, windSpeed, windDeg } = weatherData;

    const renderWindDirection = (deg) => {
        if (deg > 337.5) return 'North';
        if (deg > 292.5) return 'North west';
        if (deg > 247.5) return 'West';
        if (deg > 202.5) return 'South west';
        if (deg > 157.5) return 'South';
        if (deg > 122.5) return 'South east';
        if (deg > 67.5) return 'East';
        if (deg > 22.5) return 'North east';
        return 'North';
    }

    return (
        <Container>
            <WeatherContainer>
                <InfoRow label="Weather in" value={city} colored />
                {!errorMessage &&
                    <div>
                        <InfoRow label="Temperature:" value={temperature} unit="&#8451;" />
                        <InfoRow label="Humidity:" value={humidity} />
                        <InfoRow
                            label="Wind:"
                            value={windSpeed}
                            unit={` m/s ${renderWindDirection(windDeg)}`}
                        />
                    </div>
                }
                {errorMessage &&
                    <InfoRow label={errorMessage} />
                }
                <Search
                    loading={requestingWeatherData}
                    onSearch={(query) => {
                        history.push(`?city=${query}`)
                    }}
                />
            </WeatherContainer>
        </Container>
    )
}

const defaultCityQuery = 'Copenhagen';

const mapStateToProps = ({ weatherPageReducer }, ownProps) => {
    const values = queryString.parse(ownProps.location.search)
    const cityQuery = values.city || defaultCityQuery
    const { city, weatherData, errorMessage, requestingWeatherData } = weatherPageReducer
    return {
        city,
        weatherData,
        errorMessage,
        requestingWeatherData,
        cityQuery
    }
}

const loadData = (store, req) => {
    const cityQuery = req.query.city || defaultCityQuery
    return store.dispatch(requestWeatherDataAsync({ cityQuery }))
}

export default {
    component: connect(mapStateToProps, { requestWeatherDataAsync })(WeatherPage),
    loadData
};
