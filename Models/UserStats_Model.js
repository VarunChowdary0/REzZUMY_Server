const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profileLink: {
        type: String,
        required: true
    },
    Connection_USER_UID: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        minLength: 7,
        unique: true,
        index: true  // Adding an index for better query performance
    }
});

const userStatsSchema = new mongoose.Schema({
    USER_UID: {
        type: String,
        required: true,
        unique: true,
        index: true  // Adding an index for better query performance
    },
    data: {
        connections: {
            type: [connectionSchema],
            default: []
        },
        credit_score: {
            type: Number,
            default: 0
        },
        contributions: {
            type: Array,
            default: []
        }
    },
    // You can remove the 'default' property here
});

const UserStatModel = mongoose.model('UserStat', userStatsSchema);

module.exports = UserStatModel;
