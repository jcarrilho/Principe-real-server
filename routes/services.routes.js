// Backend --> To import packages we use Require
// React --> To import packages we use Import

const router = require('express').Router();
const mongoose = require('mongoose');
// const isAdmin = require('../middleware/isAdmin'); 

// Require Data Models
const Service = require('../models/Service.model')
const User = require('../models/User.model')

const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
    // console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
  
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
    res.json({ fileUrl: req.file.path });
  });

// POST /api/services ROUTE that creates a new service

router.post('/services', async (req, res) => {
    const { title, description, contactNumber, image, role} = req.body;

    try {
        // We will wait until we have the status of the creation of service to make the next step
        let response = await Service.create({ title, description, contactNumber, image, role});
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

router.get('/services/:id', async (req, res) => {
    const {id} = req.params;
    try {
        let service = await Service.findById(id);
        res.json(service)
    } catch (error) {
        res.json(error)
    }
})


// PUT /api/services/:servicesId to update info of a service
router.put('/services/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    const { title, description, contactNumber, email, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
    }

    try {
        let updatedService = await Service.findByIdAndUpdate(serviceId, {title, description, contactNumber, email, role}, {new: true})
        res.json(updatedService);
    } catch (error) {
        res.json(error);
    }
})

// PUT /api/services/:serviceId/accept to accept a service
router.put('/services/:serviceId/accept',    async (req, res) => {
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
router.put('/services/:serviceId/reject', /* isAdmin, */   async (req, res) => {
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