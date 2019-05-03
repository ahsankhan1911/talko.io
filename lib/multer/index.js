const multer  = require('multer');


exports.uploadForUser =  multer({ storage: multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, 'client/public/images/users')
    },
    filename: function (req, file, cb) {
        console.log(file)
        //  let date = new Date()
         let extension = file.mimetype.replace('image/', '')
         let name = req.body.name.replace(/ /g, '') + '-' + new Date().getTime() + '.' + extension
        // console.log(file.s)
      cb(null, name)
    }
  }) 
})
