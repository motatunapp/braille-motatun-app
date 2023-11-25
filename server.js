const express = require('express');
const route = require('./router');
const path = require('path');

//import library CORS
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

//app.set('view engine', 'html');

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(cors())

app.use(bodyParser.json())
app.use(express.static('public'))

/*
app.use(express.static(path.join(__dirname,'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'src')));
*/
app.use(route);

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${ PORT }`);
})