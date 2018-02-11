var express = require('express');

var todoController = require('./controllers/controller');

var app = express();

//set up template engine
app.set('view engine','ejs');

//static files
//use middleware-->app.use(route specific or not!)
app.use(express.static('./public'));

//listen to a port

//fire contollers

todoController(app);

app.listen(3000);

console.log('You are listening to port 3000');

//mvc-->model view controller!!
