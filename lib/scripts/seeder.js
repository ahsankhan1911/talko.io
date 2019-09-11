var path = require('path');
// Load .env file
require('dotenv').load({
  path: path.join(__dirname, '../../.env'),
  silent: true
});
const mongoose = require('mongoose')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

const bcrypthandler = require('../bcrypt')

const _ = require('lodash')


console.log("Starting create Admin Script...")
console.log()
console.log()

console.log("Connecting to MongoDB Database...")
console.log()


mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {useMongoClient: true}).then(( result) => {

      console.log("Connected To:" ,{
          Database: result.name,
          Port : result.port,
          Host: result.host
      })
      return;
}).then(() => {
    console.log()

     readline.question(`Enter Administrator Email: `, (email) => {
        
      email = email.toLowerCase()
        console.log(`You entered ${email} !`)
        console.log()

             readline.question(`Now enter Administrator Password: `, async (pass) => {
        
            console.log()


             console.log("Creating Administrator...")
            console.log()

            let hash =  await  bcrypthandler.encryptPassword(pass)
               
               return Admin.create({email: email, password: hash}).then((result) => {

                console.log("Admin created with email", result.email)
                console.log()
                console.log("Exiting....")
                console.log()
    
                mongoose.disconnect()
                process.exit()
              })
     
        //    readline.close()

         
          })

      })
      
})
.catch((err) => {

   throw new Error(err)

})
