const express = require('express');
const app = express();
const router = require('../backend/router/router')

app.use(router);
app.listen(8080, function(request, response){
    console.log(" server in port 8080");
});