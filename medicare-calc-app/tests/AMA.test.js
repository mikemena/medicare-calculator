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

  test('should correctly calculate total minutes and units for AMA method. 2 services and 16 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97110 and add 8 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic exercise::97110' },
    });
    const minutesInput97110 = container.querySelector('#charge-97110-minutes');
    fireEvent.change(minutesInput97110, { target: { value: '8' } });

    // Select service 97140 and add 8 minutes

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

  test('unit-9 : Should correctly calculate total minutes and units for AMA method. 2 services and 20 total minutes for 2 total units', () => {
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

    // Select service 97112 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '10' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('20');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('unit-10 : Should correctly calculate total minutes and units for AMA method. 2 services and 40 total minutes for 2 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 20 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '20' } });

    // Select service 97112 and add 20 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '20' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('40');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('unit-11 : Should correctly calculate total minutes and units for AMA method. 2 services and 12 total minutes for 0 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 5 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '5' } });

    // Select service 97112 and add 7 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '7' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('0');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('0');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('12');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('0');
  });

  test('unit-12 : Should correctly calculate total minutes and units for AMA method. 2 services and 23 total minutes for 1 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 5 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '5' } });

    // Select service 97112 and add 18 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '18' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('0');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('23');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('1');
  });

  test('unit-13 : Should correctly calculate total minutes and units for AMA method. 2 services and 23 total minutes for 1 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 5 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '5' } });

    // Select service 97112 and add 20 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '20' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('0');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('25');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('1');
  });

  test('unit-14 : Should correctly calculate total minutes and units for AMA method. 4 services and 40 total minutes for 4 total units', () => {
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

    // Select service 97112 and add 25 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '25' } });

    // Select service 97140 and add 5 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '5' } });

    // Select service 97010

    fireEvent.change(serviceSelect, {
      target: { value: 'Service Based::Hot/cold packs::97010' },
    });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('2');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('0');
    const units97010 = container.querySelector('#charge-97010-units');
    expect(units97010.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('40');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('4');
  });

  test('unit-15 : Should correctly calculate total minutes and units for AMA method. 4 services and 53 total minutes for 5 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 8 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '8' } });

    // Select service 97112 and add 30 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '30' } });

    // Select service 97140 and add 15 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '15' } });

    // Select service 97010

    fireEvent.change(serviceSelect, {
      target: { value: 'Service Based::Hot/cold packs::97010' },
    });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('2');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const units97010 = container.querySelector('#charge-97010-units');
    expect(units97010.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('53');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('5');
  });

  test('unit-16 : Should correctly calculate total minutes and units for AMA method. 5 services and 38 total minutes for 3 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 5 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '5' } });

    // Select service 97112 and add 20 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '20' } });

    // Select service 97140 and add 8 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '8' } });

    // Select service 97010

    fireEvent.change(serviceSelect, {
      target: { value: 'Service Based::Hot/cold packs::97010' },
    });

    // Select service 97530 and add 5 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Therapeutic Activities::97530' },
    });
    const minutesInput97530 = container.querySelector('#charge-97530-minutes');
    fireEvent.change(minutesInput97530, { target: { value: '5' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('0');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const units97010 = container.querySelector('#charge-97010-units');
    expect(units97010.textContent).toBe('1');
    const units97530 = container.querySelector('#charge-97530-units');
    expect(units97530.textContent).toBe('0');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('38');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('3');
  });

  test('unit-17 : Should correctly calculate total minutes and units for AMA method. 2 services and 20 total minutes for 2 total units', () => {
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

    // Select service 97112 and add 10 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '10' } });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('20');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('2');
  });

  test('unit-18 : Should correctly calculate total minutes and units for AMA method. 4 services and 53 total minutes for 5 total units', () => {
    const { getByLabelText, getByText, getAllByRole } = render(
      <ServiceSelector />
    );

    // Select AMA method
    const { container } = render(<ServiceSelector />);

    const methodSelect = container.querySelector('#methodSelector');

    fireEvent.change(methodSelect, { target: { value: 'AMA' } });

    // Select service 97116 and add 8 minutes

    const serviceSelect = container.querySelector('#chargeSelector');
    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Gait training::97116' },
    });
    const minutesInput97116 = container.querySelector('#charge-97116-minutes');
    fireEvent.change(minutesInput97116, { target: { value: '8' } });

    // Select service 97112 and add 30 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Neuromuscular re-education::97112' },
    });
    const minutesInput97112 = container.querySelector('#charge-97112-minutes');
    fireEvent.change(minutesInput97112, { target: { value: '30' } });

    // Select service 97140 and add 15 minutes

    fireEvent.change(serviceSelect, {
      target: { value: 'Time Based::Manual therapy::97140' },
    });
    const minutesInput97140 = container.querySelector('#charge-97140-minutes');
    fireEvent.change(minutesInput97140, { target: { value: '15' } });

    // Select service 97010

    fireEvent.change(serviceSelect, {
      target: { value: 'Service Based::Hot/cold packs::97010' },
    });

    // Check total minutes and units
    const units97116 = container.querySelector('#charge-97116-units');
    expect(units97116.textContent).toBe('1');
    const units97112 = container.querySelector('#charge-97112-units');
    expect(units97112.textContent).toBe('2');
    const units97140 = container.querySelector('#charge-97140-units');
    expect(units97140.textContent).toBe('1');
    const units97010 = container.querySelector('#charge-97010-units');
    expect(units97010.textContent).toBe('1');
    const totalMinutesDisplay = container.querySelector('#totalMinutes');
    expect(totalMinutesDisplay.textContent).toBe('53');
    const totalUnitsDisplay = container.querySelector('#totalUnits');
    expect(totalUnitsDisplay.textContent).toBe('5');
  });
});
