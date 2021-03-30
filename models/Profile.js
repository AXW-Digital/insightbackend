const Sequelize = require('sequelize')
const db = require('../utils/database')


const Profile = db.define("profile", {
    firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      post_number: {
        type: Sequelize.STRING
    }
});
  
module.exports = Profile;