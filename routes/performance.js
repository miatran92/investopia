const express = require('express')
const router = express.Router()
const Alpaca = require('@alpacahq/alpaca-trade-api')
const fetch = require('node-fetch')

const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  })

router.get('/',  async (req, res) => {
    const data = await alpaca.getPortfolioHistory({
      period: req.query.period
      })
    res.status(200).json(data)
    console.log(req.query.period)
})

module.exports = router