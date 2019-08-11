/**
 * @jest-environment node
 */
import request from 'supertest'
import app from '../app'

describe('Serverside rendering', () => {
    // it('is ok', () => {
    //     expect(2).toBe(2)
    // })
    it('Renders requested city', async () => {
        const res = await request(app)
            .get('/?city=Odense')
        expect(res.text).not.toContain('Copenhagen')
        expect(res.text).toContain('Odense')
    })
    // ...
})