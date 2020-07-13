const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    kills: {
        type: Number,
        default: 0
    },
    deaths: {
        type: Number,
        default: 0
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
        required: true
    }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;