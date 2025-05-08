const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');
require('dotenv').config();

const app = express();

const username = encodeURIComponent("todoapp");
const password = encodeURIComponent("fPOI5yq6GcjyUiwx");
//const username = 'todoapp';
//const password = 'fPOI5yq6GcjyUiwx';
const authMechanism = "SCRAM-SHA-256";
const port = process.env.PORT || 3000;
const uri = 'mongodb+srv://'+username+':'+password+'@tododb-hkgsg.mongodb.net/test?retryWrites=true&w=majority';
//connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "todo-app-react-xss.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//express will also fetch the client files
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

//express will also fetch the client files
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
