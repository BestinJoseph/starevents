import express from 'express'

import { getTransportations, postTransportation } from '../controllers/transportations.js'

const router = express.Router()

router.route('/').get(getTransportations)

router.route('/').all().post(postTransportation)

export default router