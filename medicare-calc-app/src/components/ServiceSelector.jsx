import React, { useState } from 'react';
import servicesData from '../cptCodes.json';
import { RiDeleteBack2Fill } from 'react-icons/ri';

import './ServiceSelector.css';

function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [calculationResults, setCalculationResults] = useState('');
  const [method, setMethod] = useState('CMS');
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    console.log('Selected:', value);
    setSelectedOption(value);
    if (value) {
      const [category, service, code] = value.split('-');
      handleAddService(category, service, code);
      setSelectedOption(''); // Reset for the next selection
    }
  };

  const handleAddService = (category, service, code) => {
    console.log('Adding service:', category, service, code);
    // Prevent adding duplicate services
    if (!selectedServices.some((s) => s.code === code)) {
      setSelectedServices((prevServices) => [
        ...prevServices,
        {
          category,
          service,
          code,
          minutes: category === 'time-based' ? 0 : null,
        },
      ]);
    }
  };

  const handleRemoveService = (code) => {
    console.log('code', code);
    console.log('Before removal:', selectedServices);
    setSelectedServices((prevServices) => {
      const filteredServices = prevServices.filter((s) => s.code !== code);
      console.log('After removal:', filteredServices);
      return filteredServices;
    });
  };

  const handleMinutesChange = (code, minutes) => {
    setSelectedServices((prevServices) =>
      prevServices.map((s) =>
        s.code === code
          ? { ...s, minutes: Math.max(0, parseInt(minutes, 10) || 0) }
          : s
      )
    );
  };

  const totalSelectedServices = selectedServices.length;

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Selected services:', selectedServices);

    // Filter out service-based and time-based services
    const serviceBasedServices = selectedServices.filter(
      (service) => service.category === 'serviceBased'
    );
    const timeBasedServices = selectedServices.filter(
      (service) => service.category === 'timeBased'
    );

    let totalUnits = serviceBasedServices.length; // Start with service-based units
    let detailedResults = [];
    let remainderMinutesTotal = 0;

    if (method === 'CMS') {
      timeBasedServices.forEach((service) => {
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
      timeBasedServices.forEach((service) => {
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
    setSelectedOption('');
    setSelectedServices([]);
    // Clear calculation results
    setCalculationResults('');
    // Reset method to default value, e.g., 'CMS'
    setMethod('CMS');
  };

  function formatCategory(category) {
    return (
      category
        // Split the string into words based on camelCase
        .replace(/([A-Z])/g, ' $1')
        // Trim any extra space that may appear at the start
        .trim()
        // Replace any space with a hyphen
        .replace(/\s+/g, '-')
        // Capitalize the first letter of each word
        .split('-')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('-')
    );
  }

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
      <h2>Select Charge</h2>
      <select
        className="service-dropdown"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="">Select Charge</option>
        {Object.entries(servicesData).map(([category, services]) => (
          <optgroup
            label={category.replace(/-/g, ' ').toUpperCase()}
            key={category}
          >
            {services.map((service) =>
              service.codes.map((code) => (
                <option
                  key={`${category}-${service.service}-${code}`}
                  value={`${category}-${service.service}-${code}`}
                >
                  {service.service} - {code}
                </option>
              ))
            )}
          </optgroup>
        ))}
      </select>
      {/* Section for displaying selected services */}
      <div className="selected-services">
        {selectedServices.map((item) => (
          <div key={item.code} className="service-list-item">
            <button
              className="remove-service-btn"
              onClick={() => handleRemoveService(item.code)}
            >
              <RiDeleteBack2Fill size={20} />
            </button>
            <span>{`${formatCategory(item.category)} - ${item.service}: ${item.code}`}</span>
            {item.category === 'time-based' && (
              <input
                type="number"
                value={item.minutes}
                onChange={(e) => handleMinutesChange(item.code, e.target.value)}
                placeholder="Minutes"
                min="0"
              />
            )}

            {item.category === 'timeBased' && (
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
          </div>
        ))}
      </div>

      {totalSelectedServices > 0 && (
        <button className="clear-all-btn" onClick={handleClearAll}>
          Reset
        </button>
      )}
      {totalSelectedServices === 0 && (
        <p className="no-services-selected">No services selected</p>
      )}
      <button className="calculate-btn" type="submit" onClick={handleSubmit}>
        Calculate
      </button>
      <div className="calculation-results">
        {/* <h3>Calculation Results</h3> */}
        <p className="calculation-result-text">{calculationResults}</p>
      </div>
    </div>
  );
}

export default ServiceSelector;
