const mongoose = require('mongoose');

// Schéma utilisateur
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, // L'utilisateur est administrateur ou non
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Méthode pour comparer les mots de passe (tu peux utiliser bcrypt ici)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Créer le modèle et l'exporter
const User = mongoose.model('User', userSchema);
module.exports = User;
