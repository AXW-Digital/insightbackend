//Load express module with `require` directive
require("dotenv").config()
const { config } = require("dotenv")
var express = require('express')
var app = express()

//Define request response in root URL (/)
app.get('/api', function (req, res) {
  const demo = [
    {
    "name": "Bart",
    "surname": "Simpson"
  },
  {
    "name": "Moe",
    "surname": "Szylark"
  }
]
  res.send(demo)
})

const PORT = process.env.PORT;
//Launch listening server on port 8081
app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`)
})