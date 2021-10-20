import express from 'express'
import passport from 'passport'

import { loginUser, registerUser, logoutUser, tokenrefresh, userProfile } from '../controllers/users.js'
import { verifyUser } from '../utils/authenticate.js'

const Router = express.Router()

Router.route('/login').all(passport.authenticate('local')).post(loginUser)
Router.route('/register').post(registerUser)
Router.route('/refreshtoken').post(tokenrefresh)
Router.route('/profile').all(verifyUser).get(userProfile)
Router.route('/logout').all(verifyUser).get(logoutUser)

export default Router