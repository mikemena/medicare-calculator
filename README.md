# Medicare Calculator App

#### The app aims to help therapists accurately track and calculate billable units for Medicare patients' treatment sessions, ensuring compliance with the 8-minute rule set by the Centers for Medicare and Medicaid Services (CMS). The 8-minute rule requires therapists to document and bill in increments of 8 minutes for rehabilitation services provided to Medicare patients.

#### The calculator app would allow therapists to input the total duration of a treatment session and automatically calculate the appropriate billable units based on the 8-minute rule. This would help prevent potential fraud or abuse of services by accurately reflecting the time spent on each intervention, ensuring proper reimbursement from Medicare.

## Rules

1 - If CMS and service-based, then set unit to 1
2 - If AMA and service-based, then set unit to 0

# CMS Unit Distribution Logic

## Step 1: Calculate Initial Units for Each Service

All 'Service Based' services are assigned 1 unit initially.
For each time-based service, calculate the number of initial 15-minute units. This is done by dividing the total minutes of each service by 15 and taking the floor of that value.

## Step 2: Aggregate Remainder Minutes

For each service, calculate the remainder minutes (the minutes that are left after calculating the initial 15-minute units). Aggregate these remainder minutes across all services.

## Step 3: Apply the 8-Minute Rule

Check each service's remainder minutes to see if it's 8 minutes or more. If so, it's eligible for an additional unit. However, before directly assigning an additional unit to each service with 8 or more remainder minutes, consider the aggregated remainder minutes from all services.

## Step 4: Distribute Additional Units Based on Aggregated Remainder Minutes

Using the aggregated remainder minutes from Step 2, distribute additional units. For every 15 minutes or part thereof (providing it's at least 8 minutes), allocate an additional unit. The distribution should prioritize services with larger remainder minutes first, as they are closer to completing another full unit.

## Step 5: Handle Edge Cases

In scenarios where multiple services have similar remainder minutes, or when the aggregated remainder minutes slightly exceed 15 (thus qualifying for only one additional unit), you may need to prioritize based on clinical judgment, service value, or other factors.

# AMA Unit Distribution Logic

## Step 1: Calculate Initial Units for Each Service

All 'Service Based' services are assigned 1 unit initially.
For each 'Time Based' service, the following logic is used:

- Check for Minimum Duration: It checks if the service duration (service.minutes) is 8 minutes or more. The 8-minute rule in AMA billing states that a service must be at least 8 minutes long to be billable.

- Calculate Units: If the service is 8 minutes or longer, it calculates the number of 15-minute units. This is done by dividing the service duration by 15 and taking the floor of the result (Math.floor(service.minutes / 15)), which gives the whole number of 15-minute units contained within the service duration.

- Apply the 8-Minute Rule for Remainder: After calculating the initial units, check the remainder of the division (service duration modulo 15). If this remainder is 8 minutes or more, an additional unit is added (service.units += 1). This is another application of the 8-minute rule, allowing for the billing of partial units as full ones if the remainder is at least 8 minutes.

- Services with less than 8 minutes are assigned 0 units.
