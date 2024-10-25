const fs = require('fs')
const path = require('path')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userFilePath = path.join(__dirname, '../models/users.json')

const readUsersFile = () => {
    const usersData = fs.readFileSync(userFilePath)
    return JSON.parse(usersData)
}

const writeUsersFile = (data) => {
    fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2))
}

exports.registro = async (req, res) => {
    const {nombre, correo, password, repassword } = req.body

    if(password !== repassword) {
        return res.status(400).send('Las contraseñas no coinciden')
    }

    const users = readUsersFile()
    const existeUser = users.find(user => user.correo === correo)
    if(existeUser) {
        return res.status(400).send('Usuario existe')
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    const nuevoUser = {
        id: users.length + 1,
        nombre: nombre,
        correo: correo,
        password: hashedPassword
    }
    users.push(nuevoUser)
    writeUsersFile(users)
    res.status(201).redirect('/auth/login')
}

exports.login = async (req, res) => {
    const { correo, password } = req.body
    const users = readUsersFile()
    const user = users.find(user => user.correo === correo)
    if (!user) {
        return res.status(400).send('Usuario no existe')
    }
    const esPasswordValido = await bcryptjs.compare(password, user.password)
    if(!esPasswordValido) {
        return res.status(400).send('Contraseña incorrecta')
    }
    const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '200s'
    })
    res.cookie('token', token, { httpOnly: true})
    res.redirect('/')
}