/* eslint-disable no-undef */
//Load express module with `require` directive
require("dotenv").config()
const morgan = require("morgan")
let data = require("./data.js")
var express = require("express")
var app = express()




//middlewares
app.use(express.json())

//custom format token called url
morgan.token("url", function(req) {
  return req.url
})


app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

//get all resources
app.get("/api", (req, res) => {


  res.send(data)
})

//get one resource
app.get("/api/:id", (req, res) => {
  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource not found" })
  }
  res.send(specific)
})

//change a resource
app.put("/api/:id", (req,res) => {
  const person = req.body
  //new entry
  const newPerson = {
    first_name: person.first_name,
    last_name: person.last_name,
    email: person.email,
    gender: person.gender,
    ip_address: person.ip_address
  }

  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource not found" })
  }
  try {
    specific.first_name = newPerson.first_name
    specific.last_name=newPerson.last_name
    specific.email = newPerson.email
    specific.gender = newPerson.gender
    specific.ip_address = newPerson. ip_address

    res.send(specific)
  } catch (error) {
    res.status(404).send("Resource not found")
  }
})


//add a resource
app.post("/api", (req, res) => {
  const body = req.body
  let id = data.length+1
  const newPerson = {
    id : id,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    ip_address: body.ip_address
  }

  try {
    data.push(newPerson)
    res.send(newPerson)
  } catch (error) {
    res.status(400).send("Malformed request! Nop cant do that")
  }
})

//delete a resource
app.delete("/api/:id", (req, res) => {
  const id = Number(req.params.id)
  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource does not found" })
  }
  data = data.filter(d => d.id !== id)
  res.status(204).end()

})

//non existing endpoint middleware
const unknownendpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownendpoint)



const PORT = process.env.PORT || 8080
//Launch listening server on port 8081
app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`)
})