const express = require('express');
const { createBooking, getUserBookings, deleteBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Créer une réservation (Utilisateur authentifié)
router.post('/', authMiddleware, createBooking);

// Obtenir les réservations de l'utilisateur authentifié
router.get('/', authMiddleware, getUserBookings);

// Supprimer une réservation (Utilisateur authentifié)
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;
