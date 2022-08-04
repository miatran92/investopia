const express = require('express')
const router = express.Router()
const Alpaca = require('@alpacahq/alpaca-trade-api')
const fetch = require('node-fetch')

const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  })

router.post('/',  async (req, res) => {
  const symbol = req.body.symbol
   const quote =  await alpaca.getLatestQuote(symbol)
   res.status(200).send(quote)
})

module.exports = router