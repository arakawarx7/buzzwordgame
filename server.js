const express = require('express');
const app = express();
//const data = require('./routes/data');
const bodyParser = require('body-parser');
const PORT = 3000;

var wordArray = [];
function createBuzzWord(word,points){
  var bWords={ "buzzWord": word, "points": parseInt(points) };
  wordArray.push(bWords);
  return { success: true };
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/buzzwords',(req,res)=>{
  res.json(wordArray);
});

app.post('/buzzwords',(req,res)=>{
  var duplicateFound = false;
  //search the array for any duplicate buzzwords
  for(var i = 0; i < wordArray.length; i++){
    if(wordArray[i].buzzWord === req.body.buzzWord){
     //if duplicate is found take note of it
      duplicateFound = true;
    }
  }
  //if no duplicate is found, add new buzzword to the array.
  if(!duplicateFound){
    createBuzzWord(req.body.buzzWord,req.body.points);
  }
   return res.json({
    //if no duplicate is found return success true.
    sucess: !duplicateFound
   });
});

const server = app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);

});