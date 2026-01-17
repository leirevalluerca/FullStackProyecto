const Property = require('../models/propertyModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

const cloudinary = require('../config/cloudinary');

// CREAR PROPIEDAD
const createProperty = async (req, res, next) => {
  
    console.log('BODY:', req.body);
console.log('FILES:', req.files?.length);
  try {
    // Features viene como string
    if (req.body.features && typeof req.body.features === 'string') {
      req.body.features = JSON.parse(req.body.features);
    }

    let imageUrls = [];

    // Subir las imágenes a Cloudinary
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(file.buffer);
        });
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    const property = await Property.create({
      ...req.body,
      images: imageUrls,
      owner: req.user._id
    });

    // Marcar al usuario como host si es su primera propiedad
    if (!req.user.isHost) {
      await User.findByIdAndUpdate(req.user._id, { isHost: true });
    }

    res.status(201).json(property);
  } catch (error) {
    next(error);
  }
};

// OBTENER TODOS LAS PROPERTIES
const getAllProperties = async (req, res, next) => {
  const { checkIn, checkOut, city, maxGuests, features } = req.query;

  try {
    // Filtro para solo propiedades Activas
    const query = { isActive: true };

    // Filtro por ciudad
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    // Filtro huéspedes
    if (maxGuests) {
      query.maxGuests = { $gte: Number(maxGuests) };
    }

    // Filtro por features
    if (features) {
      const featuresArray = features.split(',');
      query.features = { $all: featuresArray };
    }

    let properties = await Property.find(query)
      .populate('owner', 'username');

    // Filtro por disponibilidad
    if (checkIn && checkOut) {
      const bookings = await Booking.find({
        status: { $ne: 'cancelled' },
        checkIn: { $lt: new Date(checkOut) },
        checkOut: { $gt: new Date(checkIn) }
      });

      const bookedPropertyIds = bookings.map(b => b.property.toString());

      properties = properties.filter(
        p => !bookedPropertyIds.includes(p._id.toString())
      );
    }

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// VER UNA PROPERTY
const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'username');

    if (!property) {
      return res.status(404).json({ message: 'Alojamiento no encontrado' });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

// VER MIS PROPIEDADES
const getPropertiesByUserId = async (req, res, next) => {
  try {
    const properties = await Property.find({ owner: req.user._id });

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// EDITAR UNA PROPERTY
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Actualizar los campos permitidos
    const { title, description, pricePerNight, maxGuests, features } = req.body;

    property.title = title ?? property.title;
    property.description = description ?? property.description;
    property.pricePerNight = pricePerNight ?? property.pricePerNight;
    property.maxGuests = maxGuests ?? property.maxGuests;
    property.features = features ? JSON.parse(features) : property.features;

    // Añadir imágenes nuevas
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path); // o url de Cloudinary
      property.images.push(...newImages);
    }

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ELIMINAR UNA PROPERTY
const deleteProperty = async (req, res, next) => {
  try {
    // Comprobación de reservas activas
    const activeBookings = await Booking.countDocuments({
      property: req.resource._id,
      status: { $ne: 'cancelled' }
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        message: 'No se puede eliminar el alojamiento porque tiene reservas activas'
      });
    }

    // Desactivar la propiedad
    req.resource.isActive = false;
    await req.resource.save();

    // Comprobar si el usuario tiene propiedades activas
    const remainingProperties = await Property.countDocuments({
      owner: req.user._id,
      isActive: true
    });

    // Si ya no tiene ninguna property deja de ser host
    if (remainingProperties === 0) {
      await User.findByIdAndUpdate(req.user._id, { isHost: false });
    }

    res.status(200).json({ message: 'Alojamiento eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProperty, getAllProperties, getPropertyById, getPropertiesByUserId, updateProperty, deleteProperty };