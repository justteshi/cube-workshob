// TODO: Require Controllers...

const { Router } = require('express')



const router = Router()

router.get('/',(req,res) => {
    res.render('index', {
        title: 'Cube workshop'
    })
})

router.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Workshop'
    })
})

router.get('/create',(req,res) => {
    res.render('create', {
        title: 'Create Cube'
    })
})

router.get('/details/:id',(req,res) => {
    res.render('details', {
        title: 'Details'
    })
})

router.get('*',(req,res) => {
    res.render('404',{
        title: 'Not Found | 404'
    })
})

module.exports = router;