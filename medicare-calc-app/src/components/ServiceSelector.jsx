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

    // The CMS method requires adding up all the minutes first.
    if (method === 'CMS') {
      const totalTimedMinutes = timeBasedServices.reduce(
        (total, service) => total + service.minutes,
        0
      );
      const unitsFromTimedServices = Math.floor(totalTimedMinutes / 15);
      let remainderMinutes = totalTimedMinutes % 15;

      // Mixed remainders and the 8-minute rule for CMS
      const sortedServicesByMinutes = [...timeBasedServices].sort(
        (a, b) => b.minutes - a.minutes
      );
      let totalUnits = unitsFromTimedServices;

      for (const service of sortedServicesByMinutes) {
        if (service.minutes % 15 >= 8) {
          totalUnits += 1; // One unit for each service that has at least 8 mins leftover.
          remainderMinutes -= service.minutes % 15;
        }
      }

      // If remainder minutes are still 8 or more after accounting for individual services, add one more unit.
      if (remainderMinutes >= 8) {
        totalUnits += 1;
      }

      setTotalUnits(
        totalUnits +
          selectedServices.filter(
            (service) => service.category === 'Service Based'
          ).length
      );
    } else if (method === 'AMA') {
      // The AMA Rule of Eights looks at each service individually.
      let totalUnits = timeBasedServices.reduce((units, service) => {
        const serviceUnits = Math.floor(service.minutes / 15);
        return units + serviceUnits + (service.minutes % 15 >= 8 ? 1 : 0);
      }, 0);

      setTotalUnits(
        totalUnits +
          selectedServices.filter(
            (service) => service.category === 'Service Based'
          ).length
      );
    }

    setTotalMinutes(
      timeBasedServices.reduce((total, service) => total + service.minutes, 0)
    );
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
