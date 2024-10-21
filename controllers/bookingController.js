const Booking = require('../models/Booking');

// Créer une réservation
exports.createBooking = async (req, res) => {
    const { hotel, checkInDate, checkOutDate } = req.body;

    try {
        const newBooking = new Booking({
            user: req.user.id, // L'utilisateur connecté
            hotel,
            checkInDate,
            checkOutDate,
        });

        const booking = await newBooking.save();
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Obtenir les réservations d'un utilisateur
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('hotel');
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Supprimer une réservation
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Réservation non trouvée' });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Non autorisé' });
        }

        await booking.remove();
        res.json({ msg: 'Réservation supprimée' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};
