const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, lowercase: true, trim:true},
    password: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('users', userSchema);

