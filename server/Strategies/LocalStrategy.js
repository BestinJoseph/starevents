import passport from 'passport'
import { Strategy as LocalStrategy} from 'passport-local'

import User from '../model/User.js'

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())