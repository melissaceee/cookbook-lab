const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/:userId', async (req, res) => {
    try {
        const selectedUser = await User.findById(req.params.userId)
        res.render('users/show.ejs', {
            user: selectedUser
        })


    }
    catch (error) {

    }
})

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.render('users/index.ejs', {
            users: allUsers
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router