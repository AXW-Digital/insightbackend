//Load express module with `require` directive
require("dotenv").config()
const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const middleware = require('./utils/middleware')
const config = require('./utils/config')





//routers
const profileRouter = require("./controllers/profiles")





//Database
const db = require('./utils/database')
//test connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ', err))




//middlewares
app.use(cors())
app.use(express.json())


//Routes




//custom format token called url
morgan.token("url", function(req) {
  return req.url
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

//controllers
app.use("/api/profile", profileRouter)


//error middleware
app.use(middleware.unknownendpoint)

const PORT = config.port || 8080
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



