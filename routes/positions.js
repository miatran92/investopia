const express = require('express')
const router = express.Router()
const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  })

router.get('/', async (req, res) => {
  try {
    const data = await alpaca.getPositions()
    .then((data) => {
        console.log('Current Positions:', data)
        res.status(200).send(data)
        })
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router