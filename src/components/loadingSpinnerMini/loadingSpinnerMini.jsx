import React from 'react';
import './loadingSpinnerMini.css';
import SpinnerLogo from './spinnerLogo.png';  

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-mini-container p-8">
            <div className="loading-spinner-mini-logo">
                <img src={SpinnerLogo} alt="Loading..." />
            </div>
            <div className="loading-spinner-mini-text">Loading<span>.</span><span>.</span><span>.</span></div>
        </div>
    );
};

export default LoadingSpinner;
