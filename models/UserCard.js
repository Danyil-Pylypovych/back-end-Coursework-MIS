const {Schema, model} = require('mongoose');

const userCardsSchema = new Schema({
    diagnosis: {type: String, trim: true, required: true},
    prescription: {type: String, lowercase: true, trim:true},
    referral: {type: String},
    my_user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = model('userCard', userCardsSchema);

