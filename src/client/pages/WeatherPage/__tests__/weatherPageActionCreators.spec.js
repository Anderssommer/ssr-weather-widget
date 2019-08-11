import moxios from 'moxios';
import {
    REQUEST_WEATHER_DATA, RECIEVE_WEATHER_DATA, REJECT_WEATHER_DATA,
    recieveWeatherData, requestWeatherDataAsync
} from '../weatherPageActionCreators'
import { openWeatherApiUrl } from '../weatherPageConsumer'
import { mockStore } from '../../../Root';

describe('weatherPageActionCreators', () => {
    beforeEach(() => {
    })

    it('Has correct type', () => {
        const action = recieveWeatherData({ city: 'Copenhagen' });
        expect(action.type).toBe(RECIEVE_WEATHER_DATA)
        expect(action.payload.city).toBe('Copenhagen')
    })
    it('Correctly handles fetch data', async () => {
        moxios.install();
        moxios.stubRequest(openWeatherApiUrl({ cityQuery: 'Copenhagen' }), {
            status: 200,
            response: {
                main: {
                    temp: 5,
                    humidity: 60,
                },
                wind: {
                    speed: 11,
                    deg: 200
                }
            }
        })

        const store = mockStore({})
        await store.dispatch(requestWeatherDataAsync({ cityQuery: 'Copenhagen' }))
        const [action0, action1] = store.getActions()
        expect(action0.type).toEqual(REQUEST_WEATHER_DATA);
        expect(action1.type).toEqual(RECIEVE_WEATHER_DATA);
        expect(action1.payload.city).toEqual('Copenhagen');
        expect(action1.payload.weatherData).toEqual({ temperature: 5, humidity: 60, windSpeed: 11, windDeg: 200 });

        moxios.uninstall()
    })
    // ...
})