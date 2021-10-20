import Club from '../model/Club.js'
import Image from '../model/image.js'
import _ from 'lodash'

export const getAllClubs = (req, res) => {
  Club.find()
    //.populate('images')
    .exec((err, data) => {
      if(err) res.status(400).json({errors: err.message, success: false})
      if(data) {
        res.status(200).json({errors: null, success: true, data})
      } else {
        res.status(400).json({errors: err.message, success: false})
      }
    })
}

export const portClub = (req, res) => {
  Club.findOne({clubName: req.body.clubName}).then((club) => {
    if(club) {
      res.status(400).json({errors: 'Club name already exist', success: false})
    } else {
      const newclub = new Club()
      newclub.clubName = req.body.clubName
      newclub.clubType = req.body.clubType
      newclub.branchLocation.push(_.omit(req.body, ['clubName', 'clubType']))
      newclub.save((err, nClub) => {
        if(err) {
          res.status(400).json({errors: err.message, success: false})
        } else {
          if(nClub) {
            res.status(200).json({errors: null, success: true, club: nClub })
          } else {
            res.status(400).json({errors: 'Some issue occured', success: false})
          }
        }
      })
    }
  })
}