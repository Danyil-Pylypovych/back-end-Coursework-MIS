const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, trim: true},
    email: {type: String, required: true, lowercase: true, trim:true},
    password: {type: String, required: true},
    phone: {type: String, required: true, trim: true},
    gender: {type: String, trim: true},
    birth: {type: String, trim: true},
    isDoctor: {type: Boolean, required: true},
    specialty: {type: String},

}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('users', userSchema);

