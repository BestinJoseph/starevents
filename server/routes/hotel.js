import express from 'express'

import { getAllHotels, postHotel, } from '../controllers/hotels.js'
import { verifyUser } from '../utils/authenticate.js'

const Router = express.Router()

Router.route('/').get(getAllHotels)
Router.route('/').all(verifyUser).post(postHotel)

export default Router