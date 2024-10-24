import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ContentCreation from './components/ContentCreation/ContentCreation';
import Scheduling from './components/Scheduling/Scheduling';
import CampaignManagement from './components/CampaignManagement/CampaignManagement';
import Reports from './components/Reports/Reports';
import Navigation from './components/Navigation/Navigation'; // Import Navigation

const App = () => {
    return (
        <Router>
            <Navigation /> {/* Place Navigation here */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-content" element={<ContentCreation />} />
                <Route path="/scheduled-posts" element={<Scheduling />} />
                <Route path="/campaigns" element={<CampaignManagement />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </Router>
    );
};

export default App;
