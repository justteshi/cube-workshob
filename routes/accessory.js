const express = require('express')

const router = express.Router()
const { getAllAccessories } = require('../controllers/accessories')
const Accessory = require('../models/accessory')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cubes')

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory',{
        title: 'Create accessory'
    })
})

router.post('/create/accessory', async (req, res) => {
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
            res.redirect('/create')
        }
        else{
            res.redirect('/')
            console.log('Accessory created')
        }
    })
})


router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAllAccessories()
    const canAttachAccessory = cube.accessories.length !== accessories.length && accessories.length > 0

    res.render('attachAccessory',{
        title: 'Attach accessory',
        ...cube,
        accessories,
        canAttachAccessory
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCube(req.params.id, accessory)
    
    res.redirect(`/details/${req.params.id}`)
})


module.exports = router