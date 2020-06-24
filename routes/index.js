const { Router } = require('express')
const { getAllCubes } = require('../controllers/cubes')
const { getUserStatus } = require('../controllers/user')

const router = Router()

router.get('/', getUserStatus, async (req, res) => {
    const cubes = await getAllCubes()
    res.render('index', {
        title: 'Cube workshop',
        cubes,
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About Workshop',
        isLoggedIn: req.isLoggedIn
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('authId')
    res.redirect('/')
})   

module.exports = router;