import React from 'react';
import { test, expect } from '@jest/globals';
import { render, fireEvent, screen } from '@testing-library/react';
import ServiceSelector from '../src/components/ServiceSelector';

describe('ServiceSelector', () => {
  test('should correctly calculate total minutes and units for AMA method. 2 services and 33 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 10 minutes
    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '10' } });

    // Select service 97110 and add 23 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '23' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('2');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('33');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 28 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97110 and add 10 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '10' } });

    // Select service 97112 and add 8 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '8' } });

    // Select service 97140 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '10' } });

    // Check total minutes and units
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('0');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('28');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('should correctly calculate total minutes and units for AMA method. 2 services and 16 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97110 and add 10 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '8' } });

    // Select service 97140 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '8' } });

    // Check total minutes and units
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('1');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('16');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('should correctly calculate total minutes and units for CMS method. 2 services and 23 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97110 and add 13 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '13' } });

    // Select service 97140 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '10' } });

    // Check total minutes and units
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('1');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('23');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 46 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97110 and add 13 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '15' } });

    // Select service 97140 and add 8 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '8' } });

    // Select service 97112 and add 23 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '23' } });

    // Check total minutes and units
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('1');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('46');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 28 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97110 and add 10 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '10' } });

    // Select service 97112 and add 8 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '8' } });

    // Select service 97140 and add 8 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '10' } });

    // Check total minutes and units
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('1');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('0');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('28');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('should correctly calculate total minutes and units for AMA method. 2 services and 33 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 10 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '10' } });

    // Select service 97110 and add 23 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '23' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97110 = container.querySelector('#charge-97110-units');
    expect(units97110.textContent).toBe('2');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('33');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 83 total minutes for 6 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97116 and add 37 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '37' } });

    // Select service 97035 and add 23 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Ultrasound::97035' },
    });
    const minutesInput97035 = container.querySelector('#charge-97035-minutes');
    fireEvent.change(minutesInput97035, { target: { value: '23' } });

    // Select service 97761 and add 23 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Prosthetic training::97761' },
    });
    const minutesInput97761 = container.querySelector('#charge-97761-minutes');
    fireEvent.change(minutesInput97761, { target: { value: '23' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('3');
    const units97035 = container.querySelector('#charge-97035-units');
    expect(units97035.textContent).toBe('2');
    const units97761 = container.querySelector('#charge-97761-units');
    expect(units97761.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('83');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('6');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 40 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97116 and add 25 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '25' } });

    // Select service 97035 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Ultrasound::97035' },
    });
    const minutesInput97035 = container.querySelector('#charge-97035-minutes');
    fireEvent.change(minutesInput97035, { target: { value: '10' } });

    // Select service 97750 and add 5 minutes

    fireEvent.change(serviceSelect, {
      target: {
        value: 'Time Based::Physical performance test or measurement::97750',
      },
    });
    const minutesInput97750 = container.querySelector('#charge-97750-minutes');
    fireEvent.change(minutesInput97750, { target: { value: '5' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('2');
    const units97035 = container.querySelector('#charge-97035-units');
    expect(units97035.textContent).toBe('1');
    const units97750 = container.querySelector('#charge-97750-units');
    expect(units97750.textContent).toBe('0');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('40');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('should correctly calculate total minutes and units for CMS method. 3 services and 40 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97116 and add 5 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '5' } });

    // Select service 97035 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Ultrasound::97035' },
    });
    const minutesInput97035 = container.querySelector('#charge-97035-minutes');
    fireEvent.change(minutesInput97035, { target: { value: '10' } });

    // Select service 97750 and add 25 minutes

    fireEvent.change(serviceSelect, {
      target: {
        value: 'Time Based::Physical performance test or measurement::97750',
      },
    });
    const minutesInput97750 = container.querySelector('#charge-97750-minutes');
    fireEvent.change(minutesInput97750, { target: { value: '25' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('0');
    const units97035 = container.querySelector('#charge-97035-units');
    expect(units97035.textContent).toBe('1');
    const units97750 = container.querySelector('#charge-97750-units');
    expect(units97750.textContent).toBe('2');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('40');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('should correctly calculate total minutes and units for CMS method. 4 services and 47 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select CMS method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'CMS' } });

    // Select service 97116 and add 10 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '10' } });

    // Select service 97035 and add 25 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Ultrasound::97035' },
    });
    const minutesInput97035 = container.querySelector('#charge-97035-minutes');
    fireEvent.change(minutesInput97035, { target: { value: '25' } });

    // Select service 97750 and add 5 minutes

    fireEvent.change(serviceSelect, {
      target: {
        value: 'Time Based::Physical performance test or measurement::97750',
      },
    });
    const minutesInput97750 = container.querySelector('#charge-97750-minutes');
    fireEvent.change(minutesInput97750, { target: { value: '5' } });

    // Select service 97032 and add 7 minutes

    fireEvent.change(serviceSelect, {
      target: {
        value: 'Time Based::Electrical stimulation (manual)::97032',
      },
    });
    const minutesInput97032 = container.querySelector('#charge-97032-minutes');
    fireEvent.change(minutesInput97032, { target: { value: '7' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97035 = container.querySelector('#charge-97035-units');
    expect(units97035.textContent).toBe('2');
    const units97750 = container.querySelector('#charge-97750-units');
    expect(units97750.textContent).toBe('0');
    const units97032 = container.querySelector('#charge-97032-units');
    expect(units97032.textContent).toBe('0');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('47');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });
});
