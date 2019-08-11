import React from 'react';
import { mount } from 'enzyme';
import { Input } from '../';

describe('Input', () => {
    it('It updates value correctly', () => {
        const originalValue = 'TestValue'
        const updatedValue = 'UpdatedValue'
        let value = originalValue
        const wrapped = mount(<Input value={originalValue} onChange={(event) => { value = event.target.value }} />);
        expect(wrapped.find('input').prop('value')).toBe(value)

        wrapped.find('input').simulate('change', { target: { value: updatedValue } })
        expect(value).toBe(updatedValue)
    })
    // ...
})