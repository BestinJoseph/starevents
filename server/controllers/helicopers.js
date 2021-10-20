import Helicopter from "../model/Helicopter.js"

export const getHelicopters = (req, res) => {
  Helicopter.find()
    .exec((err, helicopters) => {
      if(err) {
        res.status(400).json({errors: err.message, success: false})
      } else {
        if (helicopters) {
          res.status(200).json({errors: null, success: true, helicopters})
        } else {
          res.status(400).json({errors: err.message, success: false})
        }
      }
    })
}

export const postHelicopter = (req, res) => {
  Helicopter.findOne({name: req.body.name}).then( data => {
    if(data) {
      res.status(400).json({errors: 'Name already exists', success: false})
    } else {
      Helicopter.create( req.body, (err, helicopter) => {
        if(err) {
          res.status(400).json({errors: err.message, success: false})
        } else {
          if(helicopter) {
            res.status(400).json({errors: null, success: true, helicopter})
          } else {
            res.status(400).json({errors: 'unable to save the data', success: false})
          }
        }
      })
    }
  })
}