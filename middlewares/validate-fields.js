const { response } = require('express')
const { validationResult } = require('express-validator')

const validateFields = (req, res = response, next) => {
    const err = validationResult( req )
    if(!err.isEmpty()){
        return res.status(400).json({
            ok: false,
            err: err.mapped()
        })
    }
    next()
}


module.exports = validateFields