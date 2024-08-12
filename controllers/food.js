const express = require('express')
const router = express.Router()

const User = require('../models/user')

//Index
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('foods/index.ejs', {
            foods: currentUser.pantry
        }
        )
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

});

//New
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})

//Create
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.push(req.body)
        await currentUser.save()
        res.redirect('/users/:userId/foods')
    } catch (error) {
        console.log(error)
    }

})

//Destroy
router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.id(req.params.itemId).deleteOne()
        await currentUser.save()
        res.redirect('/users/:userId/foods')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//Edit
router.get('/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentFood = currentUser.pantry.id(req.params.itemId)
        res.render('foods/edit.ejs', {
            food: currentFood
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

//Update
router.put('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const currentFood = await currentUser.pantry.id(req.params.itemId)
        currentFood.set(req.body)
        await currentUser.save()
        res.redirect('/users/:userId/foods')
    } catch (error) {
        console.log(error)
        res.redirect('/user/:userId/foods')
    }
})

module.exports = router