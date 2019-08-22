const request = require('supertest')

const server = require('./server')

const db = require('../data/dbConfig.js')

describe('GET /', () => {
    it('returns 200 OK', () => {
        return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe('POST /users', () => {
    beforeEach( async() => {
        await db('users').truncate()
    })

    it('return 201 CREATED', () => {
        return request(server)
            .post('/users')
            .send({
                name: 'user',
                age: 30
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it('return created user', () => {
        return request(server)
            .post('/users')
            .send({
                name: 'user',
                age: '30'
            })
            .then(res => {
                expect(res.body.length).toBe(1)
            })
    });
})

describe('DELETE /users', () => {
    it.skip('return 200 DELETED', () => {
        return request(server)
            .delete('/users/1')
            
            .then(res => {
                expect(res.status).toBe(200)
            })
    });

    it('return 1 after deleting', () => {
        return request(server)
            .delete('/users/1')
            .then(res => {
                expect(res.body).toBe(1)
            })
    })
})