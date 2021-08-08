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
//==================================================

//test
app.get('/', (request, response) => {
  response.send('Hello World 🌹');  
});

//===================================================


//connecting to Auth
//sends a request to Auth to connect to it 
const client = jwksClient({
  
  jwksUri: JWKSURI
});

//====================================================



function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}



  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end




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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
