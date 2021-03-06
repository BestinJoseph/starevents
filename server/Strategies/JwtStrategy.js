import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../model/User.js'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id}, (err, user) => {
      if (err) return done(err, false)
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
)