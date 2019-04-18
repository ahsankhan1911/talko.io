var bcrypt = require('bcrypt');

exports.encryptPassword = function(password) {
     let salt = bcrypt.genSaltSync(10, 'a')

     return bcrypt.hashSync(password, salt)

};

exports.comparePassword = function(plainPass, hashword, callback) {
 return  bcrypt.compareSync(plainPass, hashword, function(err, isPasswordMatch) {   
         if(err) {
           throw err
         }
         return isPasswordMatch;
   });
};