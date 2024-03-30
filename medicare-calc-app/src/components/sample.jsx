timeBasedServices.forEach((service) => {
  // Calculate the remainder for each service
  service.remainder = service.minutes % 15;
  // Initial units calculation (you might adjust this as needed)
  service.units = Math.floor(service.minutes / 15);
});

// Sort services in descending order based on the remainder
timeBasedServices.sort((a, b) => b.remainder - a.remainder);

// Distribute Units Based on Total Units Allowed
let unitsDistributed = 0;

timeBasedServices.forEach((service) => {
  if (unitsDistributed < totalUnits) {
    const unitsNeeded = Math.ceil(service.minutes / 15) - service.units; // Calculate additional units needed
    const unitsToAllocate = Math.min(
      unitsNeeded,
      totalUnits - unitsDistributed
    );
    service.units += unitsToAllocate; // Allocate units
    unitsDistributed += unitsToAllocate;
  }
});

// If there are still units left after the initial distribution, distribute them starting from the service with the largest remainder
let i = 0;
while (unitsDistributed < totalUnits && i < timeBasedServices.length) {
  timeBasedServices[i].units += 1; // Allocate an additional unit
  unitsDistributed += 1;
  i = (i + 1) % timeBasedServices.length; // Move to the next service, looping back to the start if necessary
}
