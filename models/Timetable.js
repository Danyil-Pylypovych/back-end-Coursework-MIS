const {Schema, model} = require('mongoose');

const timetableSchema = new Schema({
    
    day: {type: String}, 
    time: {type: String},
    isChecked: {type: Boolean},
    patientId: {type: String},
    doctorId: {type: String},
    
    

}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('timetable', timetableSchema);

