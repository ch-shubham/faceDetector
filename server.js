const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    database : 'smartbrain',
    password : 'Shubh@m128166'
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/',(req,res) => {res.send("Working Good right now.")});

app.post('/signin',(req,res) => {signIn.handleSignIn(req,res,db,bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res) => {image.handleImage(req,res,db)});

app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () => console.log(`App is working successfully on port ${process.env.PORT}`));















// API DESIGN (BLUEPRINT OF WORKING OF SITE) IS IMPORTANT
/*
/ --> res = this is working
/signin -->POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> updated user object 

*/






