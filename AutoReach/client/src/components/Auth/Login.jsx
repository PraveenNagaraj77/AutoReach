import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Auth.css'; // Your custom styles, if needed

const Login = () => {
    console.log("Login component rendered");

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '25rem' }}>
                <h1 className="text-center mb-4">Login to AutoReach</h1>
                <button className="btn btn-primary btn-block mb-3">Login with Instagram</button>
                <button className="btn btn-info btn-block">Login with Twitter</button>
            </div>
        </div>
    );
};

export default Login;
