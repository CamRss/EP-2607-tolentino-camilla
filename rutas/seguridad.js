const express = require('express')
const router = express.Router()
const autenticacionJWT = require('../autenticacion/autenticacionJWT')

router.get('/', autenticacionJWT, (req, res) => {
    res.send('Las rutas estan protegidas')
})

module.exports = router