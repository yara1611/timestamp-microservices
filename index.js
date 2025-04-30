// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { process_params } = require("express/lib/router");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  
  if (!date) {
    console.log("now- unix:  "+new Date().getTime()+", utc: "+new Date().toUTCString());
    return res.json({unix:new Date().getTime(), utc:new Date().toUTCString()})
  } else {
    
    console.log(
    date +
      " " +
      new Date(date).getTime() +
      " " +
      new Date(date).toUTCString() +
      " " +
      new Date(parseInt(date)).toUTCString()
  );
    
    let parsedDate = new Date(parseInt(date));
    //valid or not

    if (!isNaN(parsedDate)) {
      console.log("yes it is valid");
      if (new Date(date).getTime()) {
        console.log("utc: " + parsedDate.toUTCString());
        return res.json({utc : new Date(0).toUTCString()})
      } else {
        console.log("unix: " + date + ", utc: " + parsedDate.toUTCString());
        return res.json({unix:new Date(date), utc : new Date(date).toUTCString()})
      }
    } else return res.json({error:"Invalid Date"});

    //check unix/utc
  }
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
