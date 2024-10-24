import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./CampaignManagement.css";

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [adContent, setAdContent] = useState("");
  const [cta, setCta] = useState("");
  const [message, setMessage] = useState("");
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = {
      campaignName,
      objective,
      audience,
      budget,
      duration,
      adContent,
      cta,
    };

    try {
      if (editingCampaignId) {
        const response = await axios.put(
          `http://localhost:5000/api/campaigns/${editingCampaignId}`,
          updatedFields
        );
        setMessage("Campaign updated successfully!");

        // Update the campaign in the state directly
        setCampaigns((prevCampaigns) =>
          prevCampaigns.map((campaign) =>
            campaign.id === Number(editingCampaignId)
              ? { ...campaign, ...response.data.campaign }
              : campaign
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/campaigns",
          updatedFields
        );
        setMessage("Campaign created successfully!");
        fetchCampaigns();
      }

      clearFields();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating campaign:", error);
      setMessage("Error updating campaign. Please try again.");
    }
  };

  const clearFields = () => {
    setCampaignName("");
    setObjective("");
    setAudience("");
    setBudget("");
    setDuration("");
    setAdContent("");
    setCta("");
    setEditingCampaignId(null);
  };

  const handleEdit = (campaign) => {
    setCampaignName(campaign.campaignName);
    setObjective(campaign.objective);
    setAudience(campaign.audience);
    setBudget(campaign.budget);
    setDuration(campaign.duration);
    setAdContent(campaign.adContent);
    setCta(campaign.cta);
    setEditingCampaignId(campaign.id); // Set ID for editing (ensure this matches your backend)
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    console.log("Deleting campaign with ID:", id);

    if (!id) {
      console.error("Invalid campaign ID");
      setMessage("Invalid campaign ID");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`);
      setCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign.id !== id)
      );
      setMessage("Campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setMessage("Error deleting campaign. Please try again.");
    }
  };

  return (
    <div className="campaign-management container mt-5">
      <h2>Create Ad Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Campaign Name</label>
          <input
            type="text"
            className="form-control"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Objective</label>
          <input
            type="text"
            className="form-control"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Audience</label>
          <input
            type="text"
            className="form-control"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Budget</label>
          <input
            type="number"
            className="form-control"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ad Content</label>
          <textarea
            className="form-control"
            value={adContent}
            onChange={(e) => setAdContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Call-to-Action (CTA)</label>
          <input
            type="text"
            className="form-control"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Campaign
        </button>
        {message && <p className="text-success mt-3">{message}</p>}
      </form>

      <h3 className="mt-5">Current Campaigns</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Objective</th>
            <th>Audience</th>
            <th>Budget</th>
            <th>Duration</th>
            <th>Ad Content</th>
            <th>CTA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.campaignName}</td>
              <td>{campaign.objective}</td>
              <td>{campaign.audience}</td>
              <td>{campaign.budget}</td>
              <td>{campaign.duration}</td>
              <td>{campaign.adContent}</td>
              <td>{campaign.cta}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(campaign)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(campaign.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Campaign */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Campaign Name</label>
              <input
                type="text"
                className="form-control"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Objective</label>
              <input
                type="text"
                className="form-control"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <input
                type="text"
                className="form-control"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input
                type="number"
                className="form-control"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                className="form-control"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Ad Content</label>
              <textarea
                className="form-control"
                value={adContent}
                onChange={(e) => setAdContent(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Call-to-Action (CTA)</label>
              <input
                type="text"
                className="form-control"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Update Campaign
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CampaignManagement;
