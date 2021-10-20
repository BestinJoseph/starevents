import express from 'express'

import { getPackages, postPackage } from '../controllers/packages.js'

const router = express.Router()

router.route('/').get(getPackages)

router.route('/').all().post(postPackage)

export default router