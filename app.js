const express = require('express');
const path = require('path');
const app = express();
const port = 80;

//express specific stuff
app.use('/static', express.static('static'));
// app.use(express.urlencoded);

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
app.listen(port, () => {
    console.log(`The application started successfully at ${port}`);
})