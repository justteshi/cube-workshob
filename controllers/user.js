const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const privateKey = 'CUBE-WORKSHOP-SOFTUNI'

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
    
    const token = jwt.sign({ 
        userID: userObject._id,
        ussername: userObject.username
    }, privateKey)

    res.cookie('authId', token)

    return true

}


module.exports = {
    saveUser
}