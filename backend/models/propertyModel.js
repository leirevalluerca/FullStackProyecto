const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { address: { type: String, required: true },
                city: { type: String, required: true },
                country: { type: String, required: true }
    },
    pricePerNight: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    features: [{ type: String }] // para poner campos de la propiedad (piscina, terraza, baño privado...)
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);