const express = require("Express")
var app = express()

app.use("/", function(res,req){
  res.send(./web/index.html)
});

app.listen(3000, function(){
  console.log("App listening to port 3000")
});
