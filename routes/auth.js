const { Router } = require('express')
const { check } = require('express-validator')
const validateFields = require('../middlewares/validate-fields')
const { createUser, loginUser } = require('../controllers/auth')

const router = Router()

//create new user
router.post('/register',[
    check('username', 'The username cannot be empty!').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Example: Mystrongpass999%').isStrongPassword(),
    validateFields
], createUser)

router.post('/login',[
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is not valid').isStrongPassword(),
    validateFields
], loginUser)

module.exports = router