const express = require('express');
const { addHotel, getHotels, getHotelById, updateHotel, deleteHotel } = require('../controllers/hotelController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

// Ajouter un nouvel hôtel (Admin seulement)
router.post('/', authMiddleware, adminMiddleware, addHotel);

// Obtenir tous les hôtels (Public)
router.get('/', getHotels);

// Obtenir un hôtel par ID (Public)
router.get('/:id', getHotelById);

// Mettre à jour un hôtel (Admin seulement)
router.put('/:id', authMiddleware, adminMiddleware, updateHotel);

// Supprimer un hôtel (Admin seulement)
router.delete('/:id', authMiddleware, adminMiddleware, deleteHotel);

module.exports = router;
