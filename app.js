const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const restaurants = require('./restaurant.json')
const mongoose = require('mongoose')
const db = mongoose.connection

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.error('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.results.find(restaurant => restaurant.id === Number(id))

  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const filteredrestaurants = restaurants.results.filter(restaurant =>
    restaurant.name.includes(keyword) || restaurant.category.includes(keyword)
  )

  res.render('index', { restaurants: filteredrestaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`This is listening on http://localhost/${port}`)
})