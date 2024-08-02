const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Midleware

app.use(bodyParser.json());
app.use(cors());

//Conexion a MongoDB

mongoose.connect('mongodb://localhost:27017/nutrition_clinic',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('MongoDB conectted'))
.catch(err => console.log(err));

//Rutas

const registrationRoutes = require('./routes/registration');
app.use('/api/registration',registrationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));