const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const generateToken = data => {
    const token = jwt.sign(data, config.privateKey)

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

const authAccess = (req, res, next) => {

    const token = req.cookies['authId']

    if(!token) {
        return res.redirect('/')
    }

    try {
        jwt.verify(token, config.privateKey)
        next()

    }
    catch(e) {
        return res.redirect('/')
    }

}

const authAccessJSON = (req, res, next) => {

    const token = req.cookies['authId']

    if(!token) {
        return res.json({
            error: "Not authenticated"
        })
    }

    try {
        jwt.verify(token, config.privateKey)
        next()

    }
    catch(e) {
        return res.json({
            error: "Not authenticated"
        })
    }

}


const guestAccess = (req, res, next) => {

    const token = req.cookies['authId']

    if(token) {
        return res.redirect('/')
    }
    next()

}

const getUserStatus = (req, res, next) => {

    const token = req.cookies['authId']

    if(!token) {
        req.isLoggedIn = false
    }

    try {
        jwt.verify(token, config.privateKey)
        req.isLoggedIn = true
    }
    catch(e) {
        req.isLoggedIn = false
    }

    next()
}

module.exports = {
    saveUser,
    verifyUser,
    authAccess,
    guestAccess,
    getUserStatus,
    authAccessJSON
}