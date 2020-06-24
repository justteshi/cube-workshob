const express = require('express')

const router = express.Router()
const { getAllAccessories } = require('../controllers/accessories')
const Accessory = require('../models/accessory')
const { getCube, updateCube } = require('../controllers/cubes')
const { authAccess, getUserStatus } = require('../controllers/user')

router.get('/create/accessory', authAccess, getUserStatus, (req, res) => {
    res.render('createAccessory',{
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory', authAccess, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({
        name,
        description,
        imageUrl
    })
    
    await accessory.save((err) => {
        if (err) {
            console.error(err)
            res.redirect('/create/accessory')
        }
        else{
            res.redirect('/')
            console.log('Accessory created')
        }
    })
})


router.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAllAccessories()
    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    res.render('attachAccessory',{
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessory,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id', authAccess, async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCube(req.params.id, accessory)
    
    res.redirect(`/details/${req.params.id}`)
})


module.exports = router