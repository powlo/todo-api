const express = require('express');
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todos');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use('/api/todos', todoRoutes);

//theres no need to do this...
app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.listen(port, function(){
  console.log(`App is running on port ${port}`); 
});
