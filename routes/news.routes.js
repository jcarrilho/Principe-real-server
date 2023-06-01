// Backend --> To import packages we use Require
// React --> To import packages we use Import

const router = require('express').Router();
const mongoose = require('mongoose');


// Require Data Models
const News = require('../models/News.model')
const User = require('../models/User.model')

// POST /api/news ROUTE that creates news

router.post('/news', async (req, res) => {
    const { title, description, poster} = req.body;

    try {
        // We will wait until we have the status of the creation of news to make the next step
        let response = await News.create({ title, description, poster});
        // Send the response as json file, because we're making an API
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

// GET /api/services ROUTE that lists the Services
router.get('/news', async (req, res) => {
    try {
        let allNews = await News.find()
        res.json(allNews)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;