import React, { useState, useEffect } from 'react';
import servicesData from '../cptCodes.json';
import { RiDeleteBack2Fill, RiAddCircleFill } from 'react-icons/ri';

import './ServiceSelector.css';

function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [calculationResults, setCalculationResults] = useState('');
  const [method, setMethod] = useState('CMS');
  const [selectedOption, setSelectedOption] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalUnits, setTotalUnits] = useState(0);
  const [currentTotalMinutes, setCurrentTotalMinutes] = useState(0);

  const handleDropdownChange = (e) => {
    const value = e.target.value;

    setSelectedOption(value);
    if (value) {
      const [category, service, code] = value.split('::');
      handleAddService(category, service, code);
      setSelectedOption(''); // Reset for the next selection
    }
  };

  const handleAddService = (category, service, code) => {
    // Prevent adding duplicate services
    if (!selectedServices.some((s) => s.code === code)) {
      setSelectedServices((prevServices) => [
        ...prevServices,
        {
          category,
          service,
          code,
          minutes: category === 'Time Based' ? 0 : null,
        },
      ]);
    }
  };

  const handleRemoveService = (code) => {
    setSelectedServices((prevServices) => {
      const filteredServices = prevServices.filter((s) => s.code !== code);

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

  const needToUpdateSelectedServices = (newServices) => {
    if (newServices.length !== selectedServices.length) return true;

    return newServices.some((service, index) => {
      const currentService = selectedServices[index];
      return (
        service.units !== currentService.units ||
        service.code !== currentService.code
      ); // Add more checks as needed
    });
  };

  const calculateTotals = (billingMethod) => {
    // First, assign units directly to 'Service Based' services
    const updatedServices = selectedServices.map((service) => {
      if (service.category === 'Service Based') {
        return { ...service, units: 1 }; // Ensure 'Service Based' services have 1 unit
      }
      return service;
    });

    // Filter and process 'Time Based' services separately
    let timeBasedServices = updatedServices.filter(
      (service) => service.category === 'Time Based'
    );

    const totalTimedMinutes = timeBasedServices.reduce(
      (total, service) => total + service.minutes,
      0
    );

    let totalUnits = Math.floor(totalTimedMinutes / 15);
    let remainderMinutes = totalTimedMinutes % 15;

    // Apply the 8-minute rule for the aggregate of remainder minutes
    if (billingMethod === 'CMS' && remainderMinutes >= 8) {
      totalUnits += 1;
    }

    // For AMA, apply 8-minute rule individually for each 'Time Based' service
    if (billingMethod === 'AMA') {
      // Reset totalUnits for AMA billing as we will recalculate it
      totalUnits = 0;
      timeBasedServices.forEach((service) => {
        if (service.minutes >= 8) {
          service.units = Math.floor(service.minutes / 15);
          const remainder = service.minutes % 15;
          if (remainder >= 8) {
            service.units += 1;
          }
          totalUnits += service.units;
        } else {
          service.units = 0;
        }
      });
    } else {
      // For CMS or other billing methods, distribute initial units based on 15-minute intervals
      timeBasedServices = timeBasedServices.map((service) => {
        const unitsFromMinutes = Math.floor(service.minutes / 15);
        const remainder = service.minutes % 15;
        return { ...service, units: unitsFromMinutes, remainder };
      });

      // Calculate the total remaining minutes and determine additional units
      const totalRemainingMinutes = timeBasedServices.reduce(
        (acc, curr) => acc + curr.remainder,
        0
      );
      const additionalUnits = Math.floor(totalRemainingMinutes / 15);
      remainderMinutes += totalRemainingMinutes % 15;
    }

    // If CMS, distribute remaining units based on the highest remainder minutes
    if (billingMethod === 'CMS') {
      console.log('Starting CMS billing method calculation.');
      // Step 1: Calculate Initial Units for Each Service
      timeBasedServices.forEach((service) => {
        service.units = Math.floor(service.minutes / 15); // Calculate initial units
        service.remainder = service.minutes % 15; // Calculate remainder minutes
        console.log(`Step 1 - ${service.code} Initial Units:`, service.units);
        console.log(
          `Step 1 - ${service.code} Remainder Minutes:`,
          service.remainder
        );
      });
      console.log(`Step 1 - Initial Units:`, timeBasedServices);

      // Step 2: Aggregate Remainder Minutes
      const totalRemainderMinutes = timeBasedServices.reduce(
        (acc, service) => acc + service.remainder,
        0
      );
      console.log(
        'Step 2 - Total Aggregate Remainder Minutes:',
        totalRemainderMinutes
      );

      // Step 3 & 4: Apply the 8-Minute Rule and Distribute Additional Units
      if (totalRemainderMinutes >= 8) {
        // Sort services by remainder minutes in descending order
        timeBasedServices.sort((a, b) => {
          const remainderDiff = b.remainder - a.remainder;
          if (remainderDiff === 0) {
            // When remainders are equal, prioritize the service with fewer units
            return a.units - b.units;
          }
          return remainderDiff;
        });
        console.log(
          'Step 3 & 4 - Sorted Services by Remainder Minutes and then by Current Units:',
          timeBasedServices
        );

        // Calculate how many additional units can be allocated
        let additionalUnits =
          Math.floor(totalRemainderMinutes / 15) +
          (totalRemainderMinutes % 15 >= 8 ? 1 : 0);
        console.log(
          'Step 3 & 4 - Additional Units Available:',
          additionalUnits
        );

        for (let service of timeBasedServices) {
          console.log(
            `Allocating units to Service: ${service.code}, ${service.remainder} Remaining Additional Units: ${additionalUnits}`
          );
          if (additionalUnits <= 0) break; // Stop if no additional units left

          if (totalRemainderMinutes >= 8) {
            service.units += 1; // Assign an additional unit
            additionalUnits -= 1; // Decrement the additional units
            console.log(
              `Allocated an additional unit to Service ID: ${service.code}, Remaining Additional Units: ${additionalUnits}`
            );
          }
        }
      }

      // Step 5: Handle Edge Cases
      // Custom logic based on clinical judgment, service value, or other factors may be needed here.
      console.log(
        'Step 5 - After Handling Edge Cases (if any):',
        timeBasedServices
      );

      // Merge back the 'Time Based' services with their new units
      const finalServices = updatedServices.map((service) => {
        const timeBasedService = timeBasedServices.find(
          (s) => s.code === service.code
        );
        return timeBasedService || service;
      });
      console.log('Final Services with Updated Units:', finalServices);

      // Update state to reflect the new units distribution and total calculations
      if (needToUpdateSelectedServices(finalServices)) {
        setSelectedServices(finalServices);
      }
      setTotalUnits(
        totalUnits +
          updatedServices.filter(
            (service) => service.category === 'Service Based'
          ).length
      );
      if (totalTimedMinutes !== currentTotalMinutes) {
        setTotalMinutes(totalTimedMinutes);
      }
    }

    // Merge back the 'Time Based' services with their new units
    const finalServices = updatedServices.map((service) => {
      const timeBasedService = timeBasedServices.find(
        (s) => s.code === service.code
      );
      return timeBasedService || service;
    });

    // Update state to reflect the new units distribution and total calculations
    if (needToUpdateSelectedServices(finalServices)) {
      setSelectedServices(finalServices);
    }
    setTotalUnits(
      totalUnits +
        updatedServices.filter(
          (service) => service.category === 'Service Based'
        ).length
    );
    if (totalTimedMinutes !== currentTotalMinutes) {
      setTotalMinutes(totalTimedMinutes);
    }
  };

  // useEffect hook to recalculate totals whenever selectedServices or method changes
  useEffect(() => {
    calculateTotals(method);
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
        id="methodSelector"
        className="charge-container__method-selector"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="CMS">CMS</option>
        <option value="AMA">AMA</option>
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
                  id={`charge-${item.code}-minutes`}
                  aria-label="Minutes"
                  className="charge-container__minutes-input"
                  placeholder="0"
                  value={item.minutes || ''}
                  onChange={(e) =>
                    handleMinutesChange(item.code, e.target.value)
                  }
                  min="0"
                />
              </div>
            ) : (
              <p className="charge-container__no-minutes">N/A</p>
            )}
            <div
              id={`charge-${item.code}-units`}
              className="charge-container__units-display"
            >
              {/* {item.category === 'Service Based' ? '1' : item.units} */}
              {item.units || 0}
            </div>
          </div>
        ))}
      </div>
      <div className="charge-container__add-charge-container">
        <RiAddCircleFill className="charge-container__add-charge" size={20} />
        <select
          id="chargeSelector"
          className="charge-container__charge-selector"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="">Add Charge</option>
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
      </div>
      {totalSelectedServices > 0 && (
        <>
          {' '}
          <div>
            <div className="charge-container__total-section">
              <p className="charge-container__total-title">Total Time</p>
              <p id="totalMinutes" className="charge-container__total-minutes">
                {totalMinutes}
              </p>
              <p className="charge-container__total-title">
                Total Billable Units
              </p>
              <p id="totalUnits" className="charge-container__total-units">
                {totalUnits}
              </p>
            </div>
          </div>
          <button className="charge-container__reset-btn" onClick={handleReset}>
            Reset
          </button>
          <p className="charge-container__app-version">v1.4</p>
        </>
      )}
      {totalSelectedServices === 0 && (
        <p className="no-services-selected">No charges selected</p>
      )}
    </div>
  );
}

export default ServiceSelector;
