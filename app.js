const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.set('views', path.join(__dirname, 'paginas'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./rutas/index')
const authRoutes = require('./rutas/usuario')
const autenticacionJWT = require('./autenticacion/autenticacionJWT')

app.use('/auth', authRoutes)

app.use('/', (req,res,next) => {
    if(!req.cookies.token) {
        return res.redirect('./auth/login')
    }
    next()
})

app.use('/', autenticacionJWT, indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}, http://localhost:3000`)
})

module.exports = app