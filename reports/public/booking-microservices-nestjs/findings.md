# Event-contract scan

Findings: 8 (plus 1 info)

## EDA-INFO-NO-FLEET

**info.** No deployed versions available. Rolling-window compatibility (EDA-004) was not evaluated. This scan is in-repo topology only.

## EDA-orphan-producer — `AircraftCreated`

**medium.** Event 'AircraftCreated' is published by flight but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`

## EDA-orphan-producer — `AirportCreated`

**medium.** Event 'AirportCreated' is published by flight but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`

## EDA-orphan-producer — `BookingCreated`

**medium.** Event 'BookingCreated' is published by booking but no service in this repo declares a consumer.

- `src/building-blocks/contracts/booking.contract.ts`

## EDA-orphan-producer — `FlightCreated`

**medium.** Event 'FlightCreated' is published by flight but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`

## EDA-orphan-producer — `SeatCreated`

**medium.** Event 'SeatCreated' is published by flight but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`

## EDA-orphan-producer — `SeatReserved`

**medium.** Event 'SeatReserved' is published by flight but no service in this repo declares a consumer.

- `src/building-blocks/contracts/flight.contract.ts`

## EDA-orphan-producer — `UserDeleted`

**medium.** Event 'UserDeleted' is published by identity but no service in this repo declares a consumer.

- `src/building-blocks/contracts/identity.contract.ts`

## EDA-orphan-producer — `UserUpdated`

**medium.** Event 'UserUpdated' is published by identity but no service in this repo declares a consumer.

- `src/building-blocks/contracts/identity.contract.ts`
