const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const routes = require('../routes')
const chatDB = require('../database/connectMongo')
const io = require('socket.io')(5000)
var bodyParser = require('body-parser')

const app = express();


app.use(cors()); //Help Front end get data
app.use(express.json()); // getJson
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser()) // read Cookie
dotenv.config() // get variables environment

app.use(fileUpload({
    useTempFiles: true,
}))
const port = process.env.PORT || 5000;

chatDB.connect();
routes(app);

io.on('connection',(socket)=>{
  console.log('a user connected');
  socket.emit('message','hello world');
  socket.on('disconnect',()=>{
    console.log('a user disconnected');
  })
})

app.listen(port, (err) => {
  if (err) console.log("Server Error")
  console.log("Server is running at http://localhost:" + port);
});

