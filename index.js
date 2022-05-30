const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

const port = 8000;
app.use(cors());
app.use(bodyParser.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://arabian:arabian1234@cluster0.q40wd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  app.post('/addBooking',(req, res) => {
      const newBooking = req.body;
      bookings.insertOne(newBooking)
      .then(result =>{
        res.send(result.insertedCount > 0 );
      })
      console.log(newBooking);
  })
  app.get('/bookings',(req, res) => {
    console.log(req.query.email);
    bookings.find({email: req.query.email})
    .toArray((err, documents) =>{
      res.send(documents);
    })
  })
});

app.listen(port);