const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Esquema de registro

const RegistrationSchema = new Schema({
    name: {
        type: String,
        require: true,
    },

    email:{
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Registration', RegistrationSchema);