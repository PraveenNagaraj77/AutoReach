import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Reports.css';

const Reports = () => {
    return (
        <div className="reports container">
            <h2 className="mb-4">Reports</h2>
            <div className="report-placeholder">
                <p className="placeholder-text">Graphs and charts will be displayed here.</p>
            </div>
        </div>
    );
};

export default Reports;
