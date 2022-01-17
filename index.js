const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const Student = require('./lists.model')
const path = require('path')
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  try {

    let uri = "mongodb+srv://admin:admin@cluster0.nwnis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    //  const result = await mongoose.connect('mongodb+srv://admin:admin@cluster0.nwnis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

    const connection = mongoose.connection;

    connection.once("open", function () {
      console.log("MongoDB database connection established successfully");
    });

    //console.log("Connected")
  } catch (e) {
    console.log("error")
  }

}
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/saveData', (req, res) => {
  console.log(req.body)
 if(req.body.data) {
  Student.insertMany(req.body.data, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
 }
});


app.post('/findData', (req, res) => {
  console.log(req.body)
 if(req.body.data) {
    let name = req.body.data.name
    let Class = req.body.data.Class
  Student.findOne({name:name,Class:Class}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
 }
});




app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})


app.listen(port, () => {
  console.log(` http://localhost:${port}`)
})