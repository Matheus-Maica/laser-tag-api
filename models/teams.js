const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});
const Teams = mongoose.model("Teams", TeamsSchema);
module.exports = Teams;