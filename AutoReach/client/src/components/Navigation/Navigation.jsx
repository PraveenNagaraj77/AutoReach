import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">AutoReach</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-content">Create Content</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/campaigns">Ad Campaigns</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/scheduled-posts">Scheduled Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reports">Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
