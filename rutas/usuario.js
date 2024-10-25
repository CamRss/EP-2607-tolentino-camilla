const express = require('express')
const router = express.Router()
const controller = require('../controlador/controller')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', controller.login)

router.get('/registro', (req, res) => {
    res.render('registro')
})

router.post('/registro', controller.registro)

module.exports = router