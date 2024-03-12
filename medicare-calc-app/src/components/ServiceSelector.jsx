import React, { useState, useEffect } from 'react';
import servicesData from '../cptCodes.json';
import './ServiceSelector.css';

function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState({
    'service-based': [],
    'time-based': [],
  });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    // Initialize selected values state for each service
    const initialValues = {};
    Object.keys(servicesData).forEach((category) => {
      servicesData[category].forEach((item) => {
        initialValues[`${category}-${item.service}`] = '';
      });
    });
    setSelectedValues(initialValues);
  }, []);

  const handleSelectChange = (category, service, code) => {
    // Update the selected value for this dropdown
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [`${category}-${service}`]: code,
    }));

    // Your existing logic to add service
    handleAddService(category, service, code);
  };

  const handleAddService = (category, service, code) => {
    if (!selectedServices[category].some((s) => s.code === code)) {
      setSelectedServices((prevServices) => ({
        ...prevServices,
        [category]: [...prevServices[category], { service, code, minutes: 0 }],
      }));
    }
  };

  const handleRemoveService = (category, code) => {
    setSelectedServices((prevServices) => ({
      ...prevServices,
      [category]: prevServices[category].filter((s) => s.code !== code),
    }));
  };

  const handleMinutesChange = (category, code, value) => {
    const minutes = value === '' ? '' : Math.max(0, parseInt(value, 10) || 0);
    setSelectedServices((prevServices) => ({
      ...prevServices,
      [category]: prevServices[category].map((s) =>
        s.code === code ? { ...s, minutes: minutes } : s
      ),
    }));
  };

  const totalSelectedServices = Object.values(selectedServices).reduce(
    (total, current) => total + current.length,
    0
  );

  const handleSubmit = () => {
    // Example submit function that checks all time-based services have minutes entered
    const allTimeBasedHaveMinutes = selectedServices['time-based'].every(
      (service) => service.minutes > 0
    );

    if (!allTimeBasedHaveMinutes) {
      setAttemptedSubmit(true); // This will trigger the display of validation messages
      return; // Prevent the form from submitting
    }

    // Proceed with form submission logic...
  };

  const handleClearAll = () => {
    setSelectedServices({
      'service-based': [],
      'time-based': [],
    });
    // Reset all select dropdowns
    const resetValues = { ...selectedValues };
    Object.keys(resetValues).forEach((key) => {
      resetValues[key] = '';
    });
    setSelectedValues(resetValues);
  };

  return (
    <div className="service-selector-container">
      <h2>Select Services</h2>
      {Object.keys(servicesData).map((category) => (
        <div key={category} className="service-category">
          <h3>{category.replace(/-/g, ' ').toUpperCase()}</h3>
          {servicesData[category].map((item) => (
            <div key={item.service}>
              <label>{item.service}</label>
              <select
                className="service-dropdown"
                value={selectedValues[`${category}-${item.service}`]}
                onChange={(e) =>
                  handleAddService(category, item.service, e.target.value)
                }
              >
                <option value="">Select code</option>
                {item.codes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
      <h2>Selected Services</h2>
      {Object.keys(selectedServices).map((category) => (
        <div key={category}>
          {totalSelectedServices > 0 && (
            <h3>{category.replace(/-/g, ' ').toUpperCase()}</h3>
          )}
          {selectedServices[category].map((item) => (
            <div key={item.code} className="service-list-item">
              <button
                className="remove-service-btn"
                onClick={() => handleRemoveService(category, item.code)}
              >
                Remove
              </button>{' '}
              {category === 'time-based' && (
                <input
                  type="number"
                  className="minutes-input"
                  placeholder="Minutes"
                  value={item.minutes === 0 ? '' : item.minutes}
                  onChange={(e) =>
                    handleMinutesChange('time-based', item.code, e.target.value)
                  }
                  min="0"
                />
              )}
              <span>{`${item.service}: ${item.code}`}</span>
            </div>
          ))}
        </div>
      ))}
      {totalSelectedServices > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
      )}
      {totalSelectedServices === 0 && (
        <p className="no-services-selected">No services selected</p>
      )}
      <button className="submit-btn" type="submit">
        Calculate
      </button>
    </div>
  );
}

export default ServiceSelector;
