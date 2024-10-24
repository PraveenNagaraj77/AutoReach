let campaigns = []; // In-memory array to store campaigns
let nextId = 1; // Simple counter for campaign IDs

// Create a new campaign
exports.createCampaign = (req, res) => {
    const { campaignName, objective, audience, budget, duration, adContent, cta } = req.body;

    const newCampaign = {
        id: nextId++, // Assign a unique ID to the campaign
        campaignName,
        objective,
        audience,
        budget,
        duration,
        adContent,
        cta,
    };

    campaigns.push(newCampaign); // Add the new campaign to the in-memory array
    res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
};

// Get all campaigns
exports.getAllCampaigns = (req, res) => {
    res.status(200).json(campaigns); // Return the in-memory campaigns
};

// Update a campaign
exports.updateCampaign = (req, res) => {
    const { id } = req.params;
    const campaignIndex = campaigns.findIndex(campaign => campaign.id == id); // Ensure comparison is correct

    if (campaignIndex === -1) {
        return res.status(404).json({ message: 'Campaign not found' });
    }

    const updatedCampaign = {
        ...campaigns[campaignIndex],
        ...req.body, // Update the campaign with the request body data
    };

    campaigns[campaignIndex] = updatedCampaign; // Update the campaign in the array
    res.status(200).json({ message: 'Campaign updated successfully!', campaign: updatedCampaign });
};

// Delete a campaign
exports.deleteCampaign = (req, res) => {
    const { id } = req.params; // Get the ID from request parameters
    const campaignIndex = campaigns.findIndex(campaign => campaign.id == id); // Compare the correct ID

    if (campaignIndex === -1) {
        return res.status(404).json({ message: 'Campaign not found' });
    }

    campaigns.splice(campaignIndex, 1); // Remove the campaign from the array
    res.status(200).json({ message: 'Campaign deleted successfully!' });
};
