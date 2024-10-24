import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles
import './Scheduling.css';

const Scheduling = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="scheduling container">
            <h2 className="mb-4">Schedule Posts</h2>
            <div className="date-picker-container">
                <label htmlFor="date-picker" className="form-label">Select Date and Time:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control date-picker"
                    id="date-picker"
                />

            </div>
            {/* Additional UI for platform options can be added here */}
            <button>Schedule</button>
        </div>
    );
};

export default Scheduling;
