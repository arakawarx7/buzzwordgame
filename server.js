const express = require('express');
const app = express();
//const data = require('./routes/data');
const bodyParser = require('body-parser');
const PORT = 3000;

var wordArray = [];
var updatedScore = 0;
function createBuzzWord(word,points){
  var bWords={
    "buzzWord": word,
    "points": parseInt(points)
  };
  wordArray.push(bWords);
  return { success: true };
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/buzzwords',(req,res)=>{
  res.json(wordArray);
  console.log("get");
});

app.post('/buzzwords',(req,res)=>{
  var duplicateFound = wordArray.find((word)=>{
    //if True and buzz word is found then do nothing
    console.log("duplicate found");
    return word.buzzWord === req.body.buzzWord;
  });
  if(!duplicateFound){
    console.log("duplicate not found");
    createBuzzWord(req.body.buzzWord,req.body.points);
  }
  return res.json({
    //if no duplicate is found return success false.
    sucess: !duplicateFound
  });
});

app.put('/buzzwords',(req,res)=>{
  //if True and buzz word is found then do nothing
  var duplicateFound = wordArray.find((wordObj)=>{
    return wordObj.buzzWord === req.body.buzzWord;
  });
  var responseObj = {};

  if(duplicateFound){
    responseObj.sucess = true;
    responseObj.newScore =  updatedScore += parseInt(duplicateFound.points);
    console.log('updated score',updatedScore);
  } else {
    console.log(`there is no word`);
    responseObj.sucess = false;
  }

  return res.json(responseObj);
});



app.delete('/buzzwords',(req,res)=>{
  //if True and buzz word is found then do nothing
   wordArray = wordArray.filter((wordObj)=>{
    console.log("delete word");
    console.log( "wordObj.buzzWord",wordObj.buzzWord) ;
    console.log('req.body.buzzword',req.body.buzzWord);
    return wordObj.buzzWord !== req.body.buzzWord;
  });
   console.log("wordArray",wordArray);
  // var responseObj = {};

  // if(wordArray){
  //   responseObj.sucess = true;

  // } else {
  //   console.log(`there is no word`);
  //   responseObj.sucess = false;
  // }

   res.json({'sucess': true});
});

app.post('/reset',(req,res)=>{
  //if True and buzz word is found then do nothing
   wordArray = wordArray.filter((wordObj)=>{
    console.log("delete word");
    console.log( "wordObj.buzzWord",wordObj.buzzWord) ;
    console.log('req.body.buzzword',req.body.buzzWord);
    delete wordObj.buzzWord !== req.body.buzzWord;
  });
   console.log("wordArray",wordArray);
  // var responseObj = {};

  // if(wordArray){
  //   responseObj.sucess = true;

  // } else {
  //   console.log(`there is no word`);
  //   responseObj.sucess = false;
  // }

   res.json({'sucess': true});
});

const server = app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);

});