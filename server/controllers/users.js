import jwt from 'jsonwebtoken'

import User from '../model/User.js'
import { COOKIE_OPTIONS, getToken, getRefreshToken } from '../utils/authenticate.js'

export const loginUser = (req, res) => {
  const token = getToken({_id: req.user._id})
  const refreshToken = getRefreshToken({_id: req.user._id})
  User.findById(req.user._id).then( (user) => {
    user.refreshToken.push({ refreshToken })
    user.save((err, user) => {
      if(err) {
        res.status(500).json({error: err.message, success: false})
      } else {
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
        res.status(200).json({error: null, success: false, token})
      }
    })
  })
}

export const registerUser = (req, res) => {
  if(!req.body.firstName) {
    res.status(500).json({error: 'First name required', success: false})
  } else {
    User.register( new User({username: req.body.username}), req.body.password, (err, user) => {
      if(err) {
        res.status(500).json({error: err.message, success: false})
      } else {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName || " "
        const token = getToken({_id: user._id})
        const refreshToken = getRefreshToken({_id: user._id})
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if(err) {
            res.status(500).json({error: err.message, success: false})
          } else {
            res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
            res.status(200).json({error: null, success: true, token})
          }
        })
      }
    })
  }
}

export const tokenrefresh = (req, res) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({_id: userId}).then( user => {
        if(user) {
          const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken === refreshToken)
          if(tokenIndex === -1) {
            res.status(401).json({error: "Unauthorized", success: false})
          } else {
            const token = getToken({_id: userId})
            const newRefreshToken = getRefreshToken({_id: userId})
            user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
            user.save((err, user) => {
              if(err) {
                res.status(401).json({error: err.message, success: false})
              } else {
                res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS)
                res.status(200).json({error: null, success: true, token})
              }
            })
          }
        } else {
          res.status(401).json({error: "User not found", success: false})
        }
      })
    } catch (err) {
      res.status(500).json({error: err.message, success: false})
    }
  } else {
    res.status(500).json({error: "Unauthorized", success: false})
  }
}

export const userProfile = (req, res) => {
  res.status(200).json({error: null, success: true, user: req.user})
}

export const logoutUser = (req, res) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  User.findById(req.user._id).then( (user) => {
    if(user) {
      const tokenIndex = user.refreshToken.findIndex( item => item.refreshToken = refreshToken)
      if(tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
        user.save((err, user) => {
          if (err) res.status(500).json({error: err.message, success: false})
          if (user) {
            res.clearCookie('refreshToken', COOKIE_OPTIONS)
            res.status(200).json({error: null, success: true, message: 'Logout successfully'})
          }
        })
      } else {
        res.status(409).json({error: 'Refresh token is not available', success: false})
      }
    }
  })
}