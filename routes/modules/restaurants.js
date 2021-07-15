const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const mongoose = require('mongoose')
const restaurants = require('../../restaurant.json')


//Search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()

  return Restaurant.find()
    .lean()
    .then((restaurants) => {
      restaurants = restaurants.filter(restaurant =>
        restaurant.name.includes(keyword) || restaurant.category.includes(keyword)
      )
      if (restaurants.length === 0) {
        res.render('index', { restaurants: restaurants, keyword: keyword, alert: `<h1 class="display-5 mt-5 text-info text-center">No results.</h1>` })
      } else {
        res.render('index', { restaurants: restaurants, keyword: keyword })
      }
    })
    .catch(error => console.log(error))
})

//Read detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//Create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Edit restaurant
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  const editRestaurant = req.body

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = editRestaurant.name
      restaurant.name_en = editRestaurant.name_en
      restaurant.category = editRestaurant.category
      restaurant.image = editRestaurant.image
      restaurant.location = editRestaurant.location
      restaurant.phone = editRestaurant.phone
      restaurant.google_map = editRestaurant.google_map
      restaurant.rating = editRestaurant.rating
      restaurant.description = editRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//Delete restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .then((restaurant) => {
      return restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router