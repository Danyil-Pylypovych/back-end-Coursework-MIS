const {Schema, model} = require('mongoose');

const timetableSchema = new Schema({

    day: {type: String},
    time: {type: String},
    isChecked: {type: Boolean},
    patientId: {type: String},
    patientName: {type: String},
    doctorId: {type: String},
    isCompleted:{type: Boolean},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('timetable', timetableSchema);

