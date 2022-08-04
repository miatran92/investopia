const express = require('express')
const cors = require('cors')
require('dotenv').config()
const accountRoutes = require('./routes/account')
const posRoutes = require('./routes/positions')
const orderRoutes = require('./routes/orders')
const newsRoutes = require('./routes/news')
const quoteRoutes = require('./routes/quotes')
const performanceRoutes = require('./routes/performance')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require("path");


const corsOpts = {
        origin: ['http://localhost:3000', 'https://investopia-paper-trading-app.herokuapp.com/'],
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With",
            "Authorization",
            "Set-Cookie",
          ],
    };
app.use(cors(corsOpts));

//let express know we are going to pass json
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//connect to mongoDB

app.use('/account', accountRoutes)
app.use('/positions', posRoutes)
app.use('/news', newsRoutes)
app.use('/orders', orderRoutes)
app.use('/quotes', quoteRoutes)
app.use('/performance', performanceRoutes)
app.use('/auth', authRoutes)



// //use this directory as our static folder
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || 8000
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
        .catch((error) => console.log(`${error} did not connect`))