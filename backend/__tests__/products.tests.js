const app = require('../index')
const request = require('supertest')

describe('GET APIs',()=>{
    test('It should return product list',async ()=>{
       const response = await request(app).get('/getProducts')
       expect(response.body.length).toBeGreaterThan(2)
       expect(response.body[0]).toHaveProperty('abc')
       expect(response.statusCode).toBe(200)
    })
})