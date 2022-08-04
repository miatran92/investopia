const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
    try {
        const options = {
            headers: {
                'Apca-Api-Key-Id':process.env.APCA_API_KEY_ID,
                'Apca-Api-Secret-Key': process.env.APCA_API_SECRET_KEY,
            },
            symbol: req.query.symbol
        }
        const data = await fetch('https://data.alpaca.markets/v1beta1/news', options)  
        const dataJson =  await data.json()
        res.status(200).send(dataJson)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})

router.get('/:symbol', async (req, res) => {
        const options = {
            headers: {
                'Apca-Api-Key-Id':process.env.APCA_API_KEY_ID,
                'Apca-Api-Secret-Key': process.env.APCA_API_SECRET_KEY
                },
            }
    try {
        const symbol = (req.params.symbol).toUpperCase();
        const articles = await fetch(`https://data.alpaca.markets/v1beta1/news?&symbols=${symbol}`,options)
        const articlesJson = await articles.json()
        res.status(200).send(articlesJson)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;
