import {
    RECIEVE_WEATHER_DATA,
    REQUEST_WEATHER_DATA,
    REJECT_WEATHER_DATA
} from './weatherPageActionCreators'

const initialState = {
    city: '',
    weatherData: {
        temperature: undefined,
        humidity: undefined,
        windSpeed: undefined,
        windDeg: undefined
    },
    requestId: undefined,
    errorMessage: undefined,
    requestingWeatherData: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_WEATHER_DATA: {
            const { payload: { requestId } } = action;
            return { ...state, requestId, requestingWeatherData: true };
        }
        case REJECT_WEATHER_DATA: {
            const { payload: { errorMessage, requestId, city } } = action;
            return state.requestId === requestId
                ? { ...state, requestId, errorMessage, requestingWeatherData: false, city, weatherData: {} }
                : state;
        }
        case RECIEVE_WEATHER_DATA: {
            const { payload: { weatherData, city, requestId } } = action;
            return state.requestId === requestId
                ? { ...state, weatherData, city, requestId, errorMessage: '', requestingWeatherData: false }
                : state;
        }
        default:
            return state;
    }
};