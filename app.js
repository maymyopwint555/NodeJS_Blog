require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts')

const app = express();

const port = 3000 || process.env.port;

app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')


app.use('/', require('./server/routes/main'));

app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})