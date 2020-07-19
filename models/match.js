const mongoose = require("../database");

const MatchSchema = new mongoose.Schema({
    blueTeam: {
        player: {
            type: String,
            required: true,
            default: "Blue player"
        },
        score: {
            type: Number
        },
        result: {
            type: String,
            enum: ["won", "lost", "tied"]
        }
    },
    redTeam: {
        player: {
            type: String,
            required: true,
            default: "Red player"
        },
        score: {
            type: Number
        },
        result: {
            type: String,
            enum: ["won", "lost", "tied"]
        }
    },
    time: {
        type: String,
        required: true,
        default: "10:00"
    }
});
const Match = mongoose.model("Match", MatchSchema);
module.exports = Match;