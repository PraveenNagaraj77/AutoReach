const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// Create a new campaign
router.post('/', campaignController.createCampaign); // Updated route

// Get all campaigns
router.get('/', campaignController.getAllCampaigns); // Updated route

// Update a campaign by ID
router.put('/:id', campaignController.updateCampaign); // Updated route

// Delete a campaign by ID
router.delete('/:id', campaignController.deleteCampaign); // Updated route

module.exports = router;
