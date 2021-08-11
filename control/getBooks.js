
const { UserModel } = require('../models/users');



const getbooks = async (req, res) => {
  const { email } = req.query; // we are getting the email from the query parameter

  // Using the model, we are going to either use the find or findOne Method to get the data from the DB
  // translation code: in the userModel collection, find me a user data that matches the email
  UserModel.findOne({ email: email }, (err, user) => {

    if (user === null) {
      res.send('no data was found');
    } else {
      res.json(user.books);
    }
  });
};


module.exports = {
  getbooks
};
