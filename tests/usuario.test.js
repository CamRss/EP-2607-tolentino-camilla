const request = require('supertest')
const app = require('../app')

describe('GET /usuario/login', () => {
    it('slound render login page', async () => {
        const res = await request(app).get('/usuario/login')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toContain('Login')
    })
})

describe('GET /usuario/registro', () => {
    it('slound render registro page', async () => {
        const res = await request(app).get('/usuarios/registro')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toContain('Registro')
    })
})