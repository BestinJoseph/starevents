import Transportation from '../model/Transportation.js'

export const getTransportations = (req, res) => {
  Transportation.find()
    .exec((err, transportations) => {
      if(err) {
        res.status(500).json({error: err.message, success: false})
      } else {
        if(transportations) {
          res.status(200).json({error: null, success: true, transportations})
        } else {
          res.status(409).json({error: 'Unable to load transportation.', success: false})
        }
      }
    })
}

export const postTransportation = (req, res) => {
  Transportation.findOne({name: req.body.name})
    .exec((err, data) => {
      if(err) {
        res.status(500).json({error: err.message, success: false})
      } else {
        if(data) {
          res.status(500).json({error: 'Vehicle already exisits.', success: false})
        } else {
          Transportation.create(req.body, (err, transportation) => {
            if(err) {
              res.status(500).json({error: err.message, success: false})
            } else {
              if(transportation) {
                res.status(200).json({error: null, success: true, transportation})
              } else {
                res.status(500).json({error: 'Unable to upload data.', success: false})
              }
            }
          })
        }
      }
    })
}