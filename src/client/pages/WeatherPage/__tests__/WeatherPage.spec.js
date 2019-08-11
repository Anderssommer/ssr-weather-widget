import React from 'react';
import { mount } from 'enzyme';
import WeatherPage from '../WeatherPage';
import { Search, InfoRow } from '../localComponents';
import { mockStore } from '../../../Root';

describe('WeatherPage', () => {
    let wrapped;
    beforeEach(() => {
        const weatherPageReducer = { weatherData: { temperature: 19, humidity: 65, windSpeed: 10, windDeg: 200 }, city: 'Copenhagen' }
        wrapped = mount(
            <WeatherPage.component
                location={{ search: '?city=Copenhagen' }}
                store={mockStore({ weatherPageReducer })}
            />
        )
    })

    it('Has 4 InfoRows', () => {
        expect(wrapped.find(InfoRow).length).toEqual(4)
    })
    it('Has 1 Search', () => {
        expect(wrapped.find(Search).length).toEqual(1)
    })
})