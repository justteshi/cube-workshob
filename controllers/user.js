const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const privateKey = 'CUBE-WORKSHOP-SOFTUNI'

const generateToken = data => {
    const token = jwt.sign(data, privateKey)

    return token
}

const saveUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
        
    const user = new User({
        username,
        password: hashedPass
    })
    
    const userObject = await user.save()
    
    const token = generateToken({ 
        userID: userObject._id,
        ussername: userObject.username
    })

    res.cookie('authId', token)

    return true
}

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    //get User by username

    const user = await User.findOne({ username })

    const status = await bcrypt.compare(password, user.password)


    const token = generateToken({ 
        userID: user._id,
        ussername: user.username
    })

    res.cookie('authId', token)

   return status
}

module.exports = {
    saveUser,
    verifyUser
}