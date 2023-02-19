const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// mongoose related stuff for storing data in mongodb using mongoose which use writes
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


mongoose.set('strictQuery', true);
// mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
   
    // mongoose schema
    var contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        description: String
    });

    // locking mongoose schema and creating mongoose model
    var Contact = mongoose.model('Contact', contactSchema);


    //express specific stuff
    app.use('/static', express.static('static'));
    app.use(express.urlencoded());

    //pug specific stuff
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    // endpoints
    app.get('/', (req, res) => {
        res.status(200).render('home.pug');
    });


    app.get('/contact', (req, res) => {
        res.status(200).render('contact.pug');
    });


    app.post('/contact', (req, res) => {
        var myData = new Contact(req.body);
        myData.save().then(() => {
            res.send("This item stored in database")
        }).catch(() => {
            res.status(400).send("Item not saved");
        })
    });

    app.listen(port, () => {
        console.log(`The application started successfully at ${port}`);
    })


}