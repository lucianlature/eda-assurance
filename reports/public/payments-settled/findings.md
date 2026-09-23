# Event-contract scan

Findings: 2 (plus 1 info)

## Fixture fleet pins

**info.** Consumer field expectations and rolling window come from .eventcontracts/topology.yaml. Those pins are fixture data, not live cluster state.

Rule id: `EDA-INFO-FIXTURE-FLEET`

- `.eventcontracts/topology.yaml`

## Breaking field removal — `payments.settled.v1`

**high.** Removing required field(s) `settlementReference` from 'payments.settled.v1' is incompatible with ledger-service during a rolling deploy (~4 min window). Dual-publish a v2, redeploy this consumer first, or file a signed exception.

Rule id: `EDA-004`

- `apps/ledger-service/src/consumers/payments-settled.handler.ts`
- `apps/billing-service/src/events/payments-settled.ts`
- `.eventcontracts/topology.yaml`

## Breaking field removal — `payments.settled.v1`

**high.** Removing required field(s) `settlementReference` from 'payments.settled.v1' is incompatible with reporting-worker during a rolling deploy (~4 min window). Dual-publish a v2, redeploy this consumer first, or file a signed exception.

Rule id: `EDA-004`

- `apps/reporting-worker/src/streams/settlements.ts`
- `apps/billing-service/src/events/payments-settled.ts`
- `.eventcontracts/topology.yaml`
