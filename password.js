const bcrypt = require('bcryptjs')

const password = '1010'
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error al encriptar el password:', err)
    }else {
        console.log('Password encriptado:', hash)
    }
})