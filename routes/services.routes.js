// Backend --> To import packages we use Require
// React --> To import packages we use Import

const router = require('express').Router();
const mongoose = require('mongoose');
// const isAdmin = require('../middleware/isAdmin'); 

// Require Data Models
const Service = require('../models/Service.model')
const User = require('../models/User.model')

// POST /api/services ROUTE that creates a new service

router.post('/services', async (req, res) => {
    const { title, description, contactNumber, image, poster} = req.body;

    try {
        // We will wait until we have the status of the creation of service to make the next step
        let response = await Service.create({ title, description, contactNumber, image, poster});
        // Send the response as json file, because we're making an API
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

// GET /api/services ROUTE that lists the Services
router.get('/services', async (req, res) => {
    try {
        let allServices = await Service.find()
        res.json(allServices)
    } catch (error) {
        res.json(error)
    }
})


// PUT /api/services/:servicesId to update info of a service
router.put('/services/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const { title, description, contactNumber, poster } = req.body;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
    }

    try {
        let updatedService = await Service.findByIdAndUpdate(serviceId, {title, description, contactNumber, poster}, {new: true})
        res.json(updatedService);
    } catch (error) {
        res.json(error);
    }
})

// PUT /api/services/:serviceId/accept to accept a service
router.put('/services/:serviceId/accept', /* isAdmin, */ async (req, res) => {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
    }

    try {
        let updatedService = await Service.findByIdAndUpdate(serviceId, {status: 'approved'}, {new: true});
        res.json(updatedService);
    } catch (error) {
        res.json(error);
    }
})

// PUT /api/services/:serviceId/reject to reject a service
router.put('/services/:serviceId/reject', /* isAdmin, */ async (req, res) => {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
    }

    try {
        let updatedService = await Service.findByIdAndUpdate(serviceId, {status: 'rejected'}, {new: true});
        res.json(updatedService);
    } catch (error) {
        res.json(error);
    }
})


// DELETE a service
router.delete('/services/:serviceId', async (req, res) => {
    const { serviceId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
    }

    try {
        await Service.findByIdAndDelete(serviceId);
        res.json({ message: `Project with ${serviceId} is removed.` })
    } catch (error) {
        res.json(error)

    }
});


module.exports = router;