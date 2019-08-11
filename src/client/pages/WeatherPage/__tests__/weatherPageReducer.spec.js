import weatherPageReducer from '../weatherPageReducer';
import { REQUEST_WEATHER_DATA, RECIEVE_WEATHER_DATA, REJECT_WEATHER_DATA } from '../weatherPageActionCreators'

describe('weatherPageReducer', () => {
    it('Correctly requests weather data', () => {
        const requestId = 'testId';
        const action = {
            type: REQUEST_WEATHER_DATA,
            payload: { requestId }
        };
        const newState = weatherPageReducer({}, action);

        expect(newState.requestId).toBe(requestId);
    })
    it('Ignores old requests', () => {
        const requestId1 = 'testId1';
        const requestId2 = 'testId2';

        const action = {
            type: RECIEVE_WEATHER_DATA,
            payload: { requestId: requestId1, city: 'Copenhagen' }
        };

        const newState = weatherPageReducer({ requestId: requestId2, city: 'Odense' }, action);
        expect(newState.city).toBe('Odense');
    })
    // ..
})