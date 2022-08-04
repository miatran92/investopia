const express = require('express')
const loginValidation = require('../validation/validation')
const router = express.Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//generate token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 
        process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};
//login user
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    //validate data with joi before login
    const {error} = loginValidation(req.body)
    // console.log(error)
    if(error) return res.status(400).send(error)
    //error.details[0].message
    console.log(error)
    //find user by email in the db
    const existingUser = await User.findOne({ email })
    
    if(!existingUser) return res.status(404).json({ message: 'User not found'});
    //check if password is correct
    if(existingUser.password !== password) return res.status(400).json({message: 'Invalid credentials'})
    
    try {
        //generate token
        const token = createToken(existingUser._id);
        res.cookie('jwt', token, {
            secure: true, //https
            sameSite: "none", 
            httpOnly: true,
            maxAge: maxAge * 1000,
            // domain: ['https://celadon-conkies-7f68d0.netlify.app', 'http://localhost:3000']
        })
        res.status(200).json({ existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'})
        console.log(error)
    }
})

//get current user
router.get('/current', auth, async (req, res) => {
    if(!req.userId) return res.status(401).send('Unauthorized')

    const user = await User.findById(req.userId)
    res.status(200).json(user)
})


//logout
router.get('/logout', auth, async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: ['https://celadon-conkies-7f68d0.netlify.app', 'http://localhost:3000']
        })
        res.status(204).json('cookie cleared')
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
module.exports = router;
