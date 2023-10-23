const express = require('express');
const app = express();
const router = require('../backend/router/router')
const cors = require('cors');

app.use(cors());
app.use(router);
app.listen(4000, function(request, response){
    console.log(" server in port 4000");
});