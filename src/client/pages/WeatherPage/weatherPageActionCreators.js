import axios from 'axios'
import uuid from 'uuid/v4'
import { requestWeatherDataConsumer } from './weatherPageConsumer'

/* Could move actions, action creators and async action creators into three seperate files,
just using one file for this simple usecase */

export const REQUEST_WEATHER_DATA = 'REQUEST_WEATHER_DATA';
export const RECIEVE_WEATHER_DATA = 'RECIEVE_WEATHER_DATA';
export const REJECT_WEATHER_DATA = 'REJECT_WEATHER_DATA';

export const requestWeatherData = payload => ({ type: REQUEST_WEATHER_DATA, payload })
export const recieveWeatherData = payload => ({ type: RECIEVE_WEATHER_DATA, payload })
export const rejectWeatherData = payload => ({ type: REJECT_WEATHER_DATA, payload })

export const requestWeatherDataAsync = ({ cityQuery }) => async dispatch => {
    // Used to handle race conditions, only show most recent request.
    const requestId = uuid()

    dispatch(requestWeatherData({ requestId }))

    try {
        const { data } = await requestWeatherDataConsumer({ cityQuery });
        const { main: { temp, humidity }, wind: { speed, deg } } = data
        dispatch(recieveWeatherData({ city: cityQuery, weatherData: { temperature: temp, humidity, windSpeed: speed, windDeg: deg }, requestId }))
    } catch (error) {
        const errorMessage = 'No results found' // Inspect error and handle
        dispatch(rejectWeatherData({ city: cityQuery, errorMessage, requestId }))
    }
}
