const express = require('express');
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todos');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/todos', todoRoutes);

app.get('/', function(req, res){
  res.send('Hi');  
});

app.listen(port, function(){
  console.log(`App is running on port ${port}`); 
});
