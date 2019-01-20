const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 5003;
const server = require('http').createServer(app);
const route = require('./routes/routes');

app.use(express.static(__dirname + '/public'));

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(cors());

app.use('/api', route);

server.listen(port, function () {
    console.log(`server started at ${port}`);
}
);

