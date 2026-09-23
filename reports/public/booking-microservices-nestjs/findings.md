# Event-contract scan

Findings: 8 (plus 1 info)

## No deployed fleet pins

**info.** No deployed versions available. Rolling-window compatibility (breaking field removal vs live consumers) was not evaluated. This scan is in-repo topology only.

Rule id: `EDA-INFO-NO-FLEET`

## Orphan producer — `AircraftCreated`

**medium.** Event 'AircraftCreated' is published by flight but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/flight.contract.ts`

## Orphan producer — `AirportCreated`

**medium.** Event 'AirportCreated' is published by flight but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/flight.contract.ts`

## Orphan producer — `BookingCreated`

**medium.** Event 'BookingCreated' is published by booking but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/booking.contract.ts`

## Orphan producer — `FlightCreated`

**medium.** Event 'FlightCreated' is published by flight but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/flight.contract.ts`

## Orphan producer — `SeatCreated`

**medium.** Event 'SeatCreated' is published by flight but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/flight.contract.ts`

## Orphan producer — `SeatReserved`

**medium.** Event 'SeatReserved' is published by flight but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/flight.contract.ts`

## Orphan producer — `UserDeleted`

**medium.** Event 'UserDeleted' is published by identity but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/identity.contract.ts`

## Orphan producer — `UserUpdated`

**medium.** Event 'UserUpdated' is published by identity but no service in this repo declares a consumer.

Rule id: `EDA-orphan-producer`

- `src/building-blocks/contracts/identity.contract.ts`
