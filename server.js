'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const JWKSURI = process.env.JWKSURI;
const PORT = process.env.PORT;
const app = express();
app.use(cors());


// const MONGO_DB_URL = process.env.MONGO_DB_URL;
const mongoose = require ('mongoose');


//test
app.get('/', (request, response) => {
  response.send('Hello World 🌹');
});


//Lab11
//====================================================
//connecting to Auth
//sends a request to Auth to connect to it
const client = jwksClient({

  jwksUri: JWKSURI
});


function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// Passing the token from the frontend to backend
// The request will pass the token request headers
app.get('/verify-token', (request, response) => {

  const token = request.headers.authorization.split(' ')[1];

  //Authorization header which holds the value for the token which should be sent in all the subsequent requests


  // Once we got the token, we want to verify the token with JWT
  jwt.verify(token, getKey, {}, (error, user) => {
    if (error) {
      response.send('invalid token');
    }
    response.json(user);
  });
});
//=======================================================



//Lab12
//==================================================
// connects the mongoose with mongo DB
//mongo will create a data base once data is added
mongoose.connect(`mongodb://localhost:27017/books`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
//===================================================

//requiring the scheme and the model into your server

// const {bookSchema} =require('./models/users');

const {UserModel} =require('./models/users');

//===================================================



//this seed function will be called whenever you want to populate the Database with data

const seedUsersCollection = () => {
  try {
    const newUser = new UserModel({
      email: 'raghadalboriny@gmail.com',
      books: [
        {
          title: 'Blindness',
          description: 'A novel by Jose Saramago, It is about a contagious disease that causes blindness and suddenly the whole city is blind ,the novel is really about he presence of morality in a damaged society, and the lack thereof, and the consequences that result from right and wrong  ',
          img: 'https://kbimages1-a.akamaihd.net/6223f791-dbbb-40f1-9fce-201d5d0ac545/353/569/90/False/blindness.jpg',
          status:'Read'
        },
        {
          title: 'Man\'s Search for Meaning',
          description: 'argues that we cannot avoid suffering but we can choose how to cope with it, find meaning in it, and move forward with renewed purpose. At the heart of his theory, known as logotherapy, is a conviction that the primary human drive is not pleasure but the pursuit of what we find meaningful. Man\'s Search for Meaning has become one of the most influential books in America; it continues to inspire us all to find significance in the very act of living  ',
          img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1535419394l/4069._SY475_.jpg',
          status:'To-Read'
        },
        {
          title: 'The Master And Margarita',
          description: 'The Master and Margarita is a highly philosophical book that explores the meaning of good and evil, and how these concepts relate to life as it is actually lived. Moreover, the book makes a very specific point that good and evil do not exist independently from one another, but that each in fact requires the other,The novel is a darkly comedic takedown of Soviet society, an audacious revision of the stories of Faust and Pontius Pilate, and a thrilling love story.',
          img: 'https://images.penguinrandomhouse.com/cover/9780143108276',
          status:'Currently-Reading'
        }
      ]
    });
    newUser.save();
  } catch (error) {
    console.log('Error while creating the user: ', error.message);
  }

};
// seedUsersCollection();



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
//create a /book route

app.get('/books',(getbooks));






app.listen(PORT, () => console.log(`listening on ${PORT}`));
