const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
    messages: [{ role: String, content: String }]
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);
