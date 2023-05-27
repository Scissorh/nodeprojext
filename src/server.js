const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app=express();
const bcrypt = require('bcryptjs');
const users_collection1 = require('./userdatabase/userdata');
require('./userdatabase/mongoosecon');

app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

app.use(express.json());

let mainfolder = path.join(__dirname,'../')
app.use(express.static(mainfolder));

app.get('/',(req,res) => {
    res.sendFile(mainfolder+'/index.html');
})

app.get('/register',(req,res) => {
    res.sendFile(mainfolder+'/index.html');
})

app.get('/login',(req,res) => {
    res.sendFile(mainfolder+'/index.html');
})


app.post('/register',(req,res) => {
    let req_userdata = new users_collection1(req.body);
    req_userdata.save();
    res.sendFile(mainfolder+'/index.html');
})

app.post('/login', (req,res) => {
    res.sendFile(mainfolder + '/login.html')
})

app.post('/log', async (req, res) => {
    try {
      const umail = req.body.usermail;
      const upass = req.body.userpassword;
  
      const user = await users_collection1.findOne({ usermail: umail });
  
      if (user !== null) {
        if (user.userpassword === upass) {
          res.send('Logged in successfully!');
        } else {
          res.send('Invalid password');
        }
      } else {
        res.send('Invalid email');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
    

app.listen(port,() => {
    console.log(`listening to port ${port}`);
})