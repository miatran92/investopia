const express = require('express')
const router = express.Router()
const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  })

router.post('/', async (req, res) => {
        try {
            const response = await alpaca.createOrder({
                symbol: req.body.symbol.toUpperCase(),
                qty: parseFloat(req.body.qty), 
                side: req.body.side,
                type: req.body.type,
                time_in_force: req.body.time_in_force,
                limit_price: parseFloat(req.body.limit_price) || null, // optional,
                stop_price: parseFloat(req.body.stop_price) || null// optional,
            })
            res.status(200).send(response)
        } catch (error) {
            res.status(500).send({message: error.response.data.message})
            console.log({message: error.response.data.message})
        }
    })
        

router.get('/orderhistory', async (req, res) => {
    try {
        const response =  await alpaca.getOrders({
            status: req.query.status
        })
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
    
})
       
module.exports = router