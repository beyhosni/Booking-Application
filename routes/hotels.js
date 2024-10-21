const express = require('express');
const { addHotel, getHotels, getHotelById, updateHotel, deleteHotel } = require('../controllers/hotelController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ajouter un nouvel hôtel (Admin)
router.post('/', authMiddleware, addHotel);

// Obtenir tous les hôtels
router.get('/', getHotels);

// Obtenir un hôtel par ID
router.get('/:id', getHotelById);

// Mettre à jour un hôtel (Admin)
router.put('/:id', authMiddleware, updateHotel);

// Supprimer un hôtel (Admin)
router.delete('/:id', authMiddleware, deleteHotel);

module.exports = router;
