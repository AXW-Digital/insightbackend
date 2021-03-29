//Load express module with `require` directive
const http = require("http")
const morgan = require("morgan")
const express = require("express")
const app = express()
const { Pool } = require('pg');
const middleware = require('./utils/middleware')
const config = require('./utils/config')
//routers
const usersRouter = require("./controllers/users")

//connect to db
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
  console.log('Connected to the database')
})


pool.on('error', () => {
  console.error('Unable to connect to client')
  process.exit(-1)
})





//middlewares
app.use(express.json())

//custom format token called url
morgan.token("url", function(req) {
  return req.url
})


app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

//controllers
app.use("/api/users", usersRouter)



//error middleware
app.use(middleware.unknownendpoint)


const server = http.createServer(app)
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})



