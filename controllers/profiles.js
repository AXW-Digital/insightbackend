/* eslint-disable linebreak-style */
const profileRouter = require("express").Router()
//db
const db = require('../utils/database')
//profile model
const Profile = require('../models/Profile')


//get all resources
profileRouter.get("/", (req, res) => 
  Profile.findAll()
    .then(profiles => {
      res.send(profiles);
    })
    .catch(err => res.sendStatus(404))
  )


/*Adding manually not needed
profileRouter.get('/add', (req, res) => {
  const data = {
    firstname: "Homer",
    lastname: "Simpson",
    email: "homer@simpsons.movie",
    bio: "Just a demo biography",
    address: "Simpson Avenue 5",
    phone: "0433987654",
    city:"Simpcity",
    post_number: "12345"
  }

  let { firstname, lastname, email, bio, address, phone, city, post_number } = data;

  Profile.create({
    firstname,
    lastname,
    email,
    bio,
    address,
    phone,
    city,
    post_number
  })
  .then(result => res.redirect('/api/profile'))
  .catch(err =>  console.log(err))
})*/

//get one resource
profileRouter.get("/:id", (req, res) => {
  Profile.findById(req.params.id,)
  .then(result => {
    res.json(result)
  })
})

//change a resource
profileRouter.put("/:id", async(req,res) => {
  Profile.update(
    {email: res.body},
    {where: {id: req.params.id}}
  ).then(result => {
    res.send(result)
  }).catch(err => {
    console.log('Project update failed')
  })
    
})


//add a resource
profileRouter.post("/", async(req, res) => {
  try {
    await Profile
            .create(req.body)
            .then(result => res.send({profile: result}))
            .catch(err => console.log(err))
  } catch (error) {
    console.log(error)
  }
})

//delete a resource
profileRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const specific = data.find(found => found.id === Number(req.params.id))
  if(!specific){
    res.status(404).send({ error: "Resource does not found" })
  }
  data = data.filter(d => d.id !== id)
  res.status(204).end()

})



module.exports = profileRouter