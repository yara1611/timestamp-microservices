
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { process_params } = require('express/lib/router');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req,res)=>{
  let date = req.params.date;
  let isValid = new Date(date)
console.log('log: '+ isValid+' '+date)
  if(!date)
  {
    let now = new Date()
    return res.json({unix: now.getTime(), utc :now.toUTCString()})
  }

  if(isValid)
  {
  var utcFlag = checkDate(date)
  if(utcFlag){
    res.json({utc: new Date(parseInt(date)).toUTCString()})
  }
  else{
    res.json({unix: new Date(date).getTime(), utc: new Date(date).toUTCString()})
  }
  }
  else{
     console.log('log: error')
    res.json({error :"Invalid Date"})
  }
})

function checkDate(date){
  if(date.includes('-')){
     return true
  }
  else
    return false
}

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
