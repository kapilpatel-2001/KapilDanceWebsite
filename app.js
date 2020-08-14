const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require ("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

//creating schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/contact.pug', (req, res)=>{
   
 
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
   
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("this data has been saved to database")
    }).catch(()=> {
        res.status(404).send("this data has been throwind an error")
    });
    //res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});