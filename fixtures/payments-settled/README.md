# payments-settled fixture

Deliberate **after** state of the Kafka mock: producer dropped `settlementReference`, two consumers still require it.

This is not a live cluster. `.eventcontracts/topology.yaml` pins consumer expects and a 252s rolling window. Do not read those pins as `kafka-consumer-groups.sh` output.

```shell
node src/cli.ts scan fixtures/payments-settled --out reports/payments-settled
```

Expected: **EDA-004** on `ledger-service` and `reporting-worker`. `notifications` stays compatible.
