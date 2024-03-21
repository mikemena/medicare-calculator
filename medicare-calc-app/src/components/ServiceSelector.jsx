import React, { useState, useEffect } from 'react';
import servicesData from '../cptCodes.json';
import { RiDeleteBack2Fill } from 'react-icons/ri';

import './ServiceSelector.css';

function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [calculationResults, setCalculationResults] = useState('');
  const [method, setMethod] = useState('CMS');
  const [selectedOption, setSelectedOption] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    console.log('Selected:', value);
    setSelectedOption(value);
    if (value) {
      const [category, service, code] = value.split('::');
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

  const calculateTotals = () => {
    const timeBasedServices = selectedServices.filter(
      (service) => service.category === 'Time Based'
    );
    let newTotalMinutes = timeBasedServices.reduce(
      (total, service) => total + service.minutes,
      0
    );
    let newTotalUnits = selectedServices.length; // Starting with the count of service-based services

    if (method === 'CMS') {
      // CMS-specific calculations here
      // Remember to include logic for the 8-minute rule and 15-minute intervals
    } else if (method === 'AMA') {
      // AMA-specific calculations here
      // Typically involves the 8-minute rule
    }

    // Update state with new totals
    setTotalMinutes(newTotalMinutes);
    setTotalUnits(newTotalUnits);
  };

  // useEffect hook to recalculate totals whenever selectedServices or method changes
  useEffect(() => {
    calculateTotals();
  }, [selectedServices, method]);

  const handleReset = () => {
    setSelectedOption('');
    setSelectedServices([]);
    // Clear calculation results
    setCalculationResults('');
    // Reset method to default value, e.g., 'CMS'
    setMethod('CMS');
  };

  return (
    <div className="charge-container">
      <h2>Select Calculation Method</h2>

      <select
        className="charge-container__method-selector"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="CMS">CMS</option>
        <option value="AMA">AMA</option>
      </select>

      <h2>Select Charge</h2>
      <select
        className="charge-container__charge-selector"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="">Select Charge</option>
        {Object.entries(servicesData).map(([category, services]) => (
          <optgroup label={category.toUpperCase()} key={category}>
            {services.map((service) =>
              service.codes.map((code) => (
                <option
                  key={`${category}::${service.service}::${code}`}
                  value={`${category}::${service.service}::${code}`}
                >
                  {code} - {service.service}
                </option>
              ))
            )}
          </optgroup>
        ))}
      </select>
      {/* Section for displaying selected services */}
      <div className="charge-container__selected-services">
        <div className="charge-container__selected-services-header">
          Charges
        </div>
        <div className="charge-container__selected-services-header">
          Minutes
        </div>
        <div className="charge-container__selected-services-header">Units</div>

        {selectedServices.map((item) => (
          <div
            key={item.code}
            className="charge-container__selected-services-item"
          >
            <div className="charge-details">
              <button
                className="charge-container__remove-btn"
                onClick={() => handleRemoveService(item.code)}
              >
                <RiDeleteBack2Fill size={20} />
              </button>

              {`${item.code} - ${item.service} `}
            </div>
            {item.category === 'Time Based' ? (
              <div className="charge-container__minutes-input_container">
                <input
                  type="number"
                  className="charge-container__minutes-input"
                  placeholder="0"
                  value={item.minutes === 0 ? '' : item.minutes}
                  onChange={(e) =>
                    handleMinutesChange(item.code, e.target.value)
                  }
                  min="0"
                />
              </div>
            ) : (
              <p className="charge-container__no-minutes">N/A</p>
            )}
            <div className="charge-container__units-display">
              {Math.ceil(item.minutes / 15)}
            </div>
          </div>
        ))}
      </div>

      {totalSelectedServices > 0 && (
        <>
          {' '}
          <div>
            <div className="charge-container__total-section">
              <p className="charge-container__total-title">Total</p>
              <p className="charge-container__total-minutes">{totalMinutes}</p>
              <p className="charge-container__total-units">{totalUnits}</p>
            </div>
          </div>
          <button className="charge-container__reset-btn" onClick={handleReset}>
            Reset
          </button>
        </>
      )}
      {totalSelectedServices === 0 && (
        <p className="no-services-selected">No charges selected</p>
      )}
    </div>
  );
}

export default ServiceSelector;
