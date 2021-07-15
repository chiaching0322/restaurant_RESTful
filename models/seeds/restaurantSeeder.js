const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const raw = require('../../restaurant.json')
const restaurants = raw.results

db.once('open', () => {
  console.log('mongodb connected!')
  restaurants.forEach((restaurant) => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })

  console.log('done')
})