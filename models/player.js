const mongoose = require("../database");

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    kills: {
        type: Number,
        default: 0,
        index: true,
    },
    deaths: {
        type: Number,
        default: 0
    },
    kd: {
        type: Number,
        default: 0,
    },
});
const Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;