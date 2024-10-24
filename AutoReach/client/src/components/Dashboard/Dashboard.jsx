import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard container-fluid">
            <h2 className="mb-4">Dashboard</h2>
            <div className="summary-cards row">
                {/* Example of a summary card */}
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Total Posts</h5>
                            <p className="card-text">10</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Scheduled Campaigns</h5>
                            <p className="card-text">5</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Total Impressions</h5>
                            <p className="card-text">1,000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
