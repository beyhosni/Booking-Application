const Hotel = require('../models/Hotel');

// Ajouter un nouvel hôtel
exports.addHotel = async (req, res) => {
    const { name, description, price, location } = req.body;

    try {
        const newHotel = new Hotel({
            name,
            description,
            price,
            location,
        });

        const hotel = await newHotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Obtenir tous les hôtels
exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Obtenir un hôtel par ID
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hôtel non trouvé' });
        }
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Mettre à jour un hôtel
exports.updateHotel = async (req, res) => {
    const { name, description, price, location, availability } = req.body;

    try {
        let hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hôtel non trouvé' });
        }

        // Mettre à jour les champs
        hotel.name = name || hotel.name;
        hotel.description = description || hotel.description;
        hotel.price = price || hotel.price;
        hotel.location = location || hotel.location;
        hotel.availability = availability !== undefined ? availability : hotel.availability;

        hotel = await hotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};

// Supprimer un hôtel
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hôtel non trouvé' });
        }

        await hotel.remove();
        res.json({ msg: 'Hôtel supprimé' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
};


exports.getHotels = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
              $or: [
                  { name: { $regex: req.query.keyword, $options: 'i' } },
                  { location: { $regex: req.query.keyword, $options: 'i' } },
              ],
          }
        : {};

    try {
        const count = await Hotel.countDocuments({ ...keyword });
        const hotels = await Hotel.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            hotels,
            page,
            pages: Math.ceil(count / pageSize),
        });
    } catch (err) {
        next(err);
    }
};
