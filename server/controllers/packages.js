import Package from '../model/Package.js'

export const getPackages = (req, res) => {
  Package.find()
    .exec((err, packages) => {
      if(err) {
        res.status(400).json({error: err.message, success: false})
      } else {
        if(packages) {
          res.status(200).json({error: null, success: true, packages})
        } else {
          res.status(400).json({error: 'Unable to load packages data', success: false})
        }
      }
    })
}

export const postPackage = (req, res) => {
  Package.findOne({gender: req.body.gender, budget: req.body.budget})
    .exec((err, data) => {
      if(err) {
        res.status(400).json({error: err.message, success: false})
      } else {
        if(data) {
          res.status(400).json({error: 'Package already exists', success: false})
        } else {
          Package.create(req.body, (err, packages) => {
            if(err) {
              res.status(400).json({error: err.message, success: false})
            } else {
              if(packages) {
                res.status(200).json({error: null, success: true, package: packages})
              } else {
                res.status(400).json({error: 'Unable to save package', success: false})
              }
            }
          })
        }
      }
    })
}