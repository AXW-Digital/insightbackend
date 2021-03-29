


//non existing endpoint middleware
const unknownendpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}


module.exports={ unknownendpoint }