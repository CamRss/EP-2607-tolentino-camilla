const jwt = require('jsonwebtoken')

const autenticacionJWT = (req, res, next) => {
    const token = req.cookies.token
    if (!token){
        return res.redirect('/auth/login')
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.redirect('/auth/login')
    }
}

module.exports = autenticacionJWT