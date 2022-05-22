const jwt = require('jsonwebtoken')

const generateJWT = (id, name) => {
    const payload = { id, name }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        },(err, token) => {
            if(err){
                console.log(err)
                reject(err)
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = generateJWT