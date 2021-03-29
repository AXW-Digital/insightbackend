/* eslint-disable linebreak-style */
const usersRouter = require("express").Router()
let data = require("../data")


//get all resources
usersRouter.get("/", (req, res) => {
  console.log('hello')
  res.send(data)
})

//get one resource
usersRouter.get("/:id", (req, res) => {
  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource not found" })
  }
  res.send(specific)
})

//change a resource
usersRouter.put("/:id", (req,res) => {
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
usersRouter.post("/", (req, res) => {
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
usersRouter.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id)
  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource does not found" })
  }
  data = data.filter(d => d.id !== id)
  res.status(204).end()

})



module.exports = usersRouter