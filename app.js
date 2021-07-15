const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const restaurants = require('./restaurant.json')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant.js')
const restaurant = require('./models/restaurant.js')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`This is listening on http://localhost:${port}`)
})