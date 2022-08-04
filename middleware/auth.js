const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    console.log(token)

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                console.log(err)
                res.json({ message: err})
                // res.redirect('/')
                console.log('Access denied')
            } else {
                console.log(decoded, 'verified')
                req.userId = decoded.id
                next()
            }
        })
    } else {
        // res.redirect('/auth/login')
        res.json({ message: 'no token found'})
        console.log('no token found')
    }
}

module.exports = auth