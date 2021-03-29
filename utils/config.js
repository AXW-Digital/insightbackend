if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

let postgresUrl = process.env.DATABASE_URL
let port = process.env.PORT

module.exports =  { port, postgresUrl}