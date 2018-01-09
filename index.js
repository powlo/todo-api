var express = require('express');

app = express();

app.get('/', function(req, res){
  res.send('Hi');  
});

app.listen(process.env.PORT, function(){
  console.log(`App is running on port ${process.env.PORT}`); 
});

