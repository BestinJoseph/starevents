import express from 'express'

import { verifyUser } from '../utils/authenticate.js'
import { getAllClubs, portClub } from '../controllers/clubs.js'

const router = express.Router()

router.route('/').get(getAllClubs)

router.route('/').all().post(portClub)

export default router