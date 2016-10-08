const express = require('express');
const app = express();
//const data = require('./routes/data');
const bodyParser = require('body-parser');
const PORT = 3000;

var words=[];
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/buzzwords',(req,res)=>{
  res.json({'buzzwords':[]});
});



const server = app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);
});