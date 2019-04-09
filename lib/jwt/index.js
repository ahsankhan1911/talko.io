var Promise = require('bluebird')
var jwt =  require('jsonwebtoken')

exports.generateAccessToken = (payload ) => {

   return  new Promise ( (resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXP_TIME}, (err, encoded) => {
        if(err) {
            reject(err)
        }
        else {
            resolve(encoded)
        }
    })
     
   }) 
}

exports.decodeAccessToken = (token ) => {


    return new Promise ( (resolve, reject) => {

        var decodedPayload = jwt.decode(token, {complete: true})

        if(decodedPayload) 
            resolve( decodedPayload)
         else
            reject("Invalid code")
       }) 
}

exports.verifyAccessToken = (token ) => {
    return new Promise ( (resolve, reject) => {

        var verifiedPayload = jwt.verify(token,process.env.JWT_SECRET_KEY, {complete: true})

        if(verifiedPayload) 
            resolve( verifiedPayload)
         else
            reject("Invalid code")
       }) 

}
