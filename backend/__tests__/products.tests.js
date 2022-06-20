const app = require('../index')
const request = require('supertest')

describe('GET API',()=>{
    test('It should return product list',async ()=>{
        const response = await request(app).get('/getProducts')
        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0]).toHaveProperty('mera')
        expect(response.statusCode).toBe(200)
    })
})