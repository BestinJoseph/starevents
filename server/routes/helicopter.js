import express from 'express'

import { getHelicopters, postHelicopter } from '../controllers/helicopers.js'

const router = express.Router()

router.route('/').get(getHelicopters)

router.route('/').all().post(postHelicopter)

export default router
