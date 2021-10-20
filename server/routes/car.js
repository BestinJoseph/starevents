import express from 'express'
import { getCars, postCar } from '../controllers/cars.js'

const router = express.Router()

router.route('/').get(getCars)

router.route('/').all().post(postCar)

export default router