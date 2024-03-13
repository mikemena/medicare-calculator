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
  const [calculationResults, setCalculationResults] = useState('');
  const [method, setMethod] = useState('CMS');

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

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    let totalUnits = selectedServices['service-based'].length; // Start with service-based units
    let detailedResults = [];
    let remainderMinutesTotal = 0;

    if (method === 'CMS') {
      selectedServices['time-based'].forEach((service) => {
        const units = Math.floor(service.minutes / 15);
        const remainderMinutes = service.minutes % 15;
        remainderMinutesTotal += remainderMinutes;

        detailedResults.push({ code: service.code, units, remainderMinutes });
        totalUnits += units;
      });

      // Round up using remainder minutes if possible
      detailedResults = detailedResults.map((result) => {
        if (
          remainderMinutesTotal >= 15 - result.remainderMinutes &&
          result.remainderMinutes > 0
        ) {
          remainderMinutesTotal -= 15 - result.remainderMinutes;
          result.units += 1;
          totalUnits += 1;
          result.remainderMinutes = 0; // This service is now fully used
        }
        return result;
      });

      // Apply 8-minute rule for any remaining minutes
      detailedResults.forEach((result) => {
        if (result.remainderMinutes >= 8) {
          totalUnits += 1;
          result.units += 1;
          result.remainderMinutes = 0; // This service is now fully used
        }
      });
    } else if (method === 'AMA') {
      // AMA method calculation (Rule of Eights)
      selectedServices['time-based'].forEach((service) => {
        const units = Math.floor(service.minutes / 8);
        if (units > 0) {
          detailedResults.push({ code: service.code, units }); // Each qualifying service is 1 unit
          totalUnits += units;
        }
      });
    }

    // Prepare the results for display
    const resultsString =
      detailedResults
        .map((result) => `${result.code}: ${result.units} unit(s)`)
        .join(', ') + ` Total units: ${totalUnits}`;

    setCalculationResults(resultsString);
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
    // Clear calculation results
    setCalculationResults('');
    // Reset method to default value, e.g., 'CMS'
    setMethod('CMS');
  };

  return (
    <div className="service-selector-container">
      <h2>Select Calculation Method</h2>
      <div className="method-selector">
        <label htmlFor="method">Method</label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="CMS">CMS</option>
          <option value="AMA">AMA</option>
        </select>
      </div>
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
      <button className="calculate-btn" type="submit" onClick={handleSubmit}>
        Calculate
      </button>
      <div className="calculation-results">
        <h3>Calculation Results</h3>
        <p className="calculation-result-text">{calculationResults}</p>
      </div>
    </div>
  );
}

export default ServiceSelector;
