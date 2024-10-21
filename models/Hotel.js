const mongoose = require('mongoose');

// Schéma hôtel
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true, // Disponible ou non
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Créer le modèle et l'exporter
const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
