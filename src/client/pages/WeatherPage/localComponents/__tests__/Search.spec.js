import React from 'react';
import { mount, shallow } from 'enzyme';
import { Search } from '../';
import { Input, Button } from '../../../../components'

describe('Search shallow', () => {
    let wrapped;
    beforeEach(() => {
        wrapped = shallow(<Search onSearch={() => { }} />);
    })

    it('Has 1 Input', () => {
        expect(wrapped.find(Input).length).toEqual(1)
    })
    it('Has 1 Button', () => {
        expect(wrapped.find(Button).length).toEqual(1)
    })
})

describe('Search full dom', () => {
    let wrapped;
    beforeEach(() => {
        wrapped = mount(<Search onSearch={() => { }} />);
    })

    it('Can change input value', () => {
        const inputString = 'Copenhagen'

        wrapped.find('input').simulate('change', {
            target: { value: inputString }
        })
        wrapped.update()
        expect(wrapped.find('input').prop('value')).toEqual(inputString)

        wrapped.find('button').simulate('click')
        wrapped.update()

        // Text field should empty when searching
        expect(wrapped.find('input').prop('value')).toEqual('')
    })
})