const express = require('express');
const app = express();
//const data = require('./routes/data');
const bodyParser = require('body-parser');
const PORT = 3000;

var wordArray = [];
function createBuzzWord(word,points){
  var bWords=[{ "buzzWord": word, "points": points }];
  wordArray.push(bWords);
  return { "success": true };
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/buzzwords',(req,res)=>{
  res.json(wordArray);
});

app.post('/buzzwords',(req,res)=>{

 let holder = createBuzzWord(req.body.buzzWord,req.body.points);
 console.log('createbuzzword',holder);
 res.json(holder);
});

const server = app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);
});