/** Stable machine ids → plain-English titles for humans. */
export function ruleTitle(rule: string): string {
  switch (rule) {
    case "EDA-004":
      return "Breaking field removal";
    case "EDA-orphan-producer":
      return "Orphan producer";
    case "EDA-orphan-consumer":
      return "Orphan consumer";
    case "EDA-undefined-ref":
      return "Undefined contract reference";
    case "EDA-INFO-NO-FLEET":
      return "No deployed fleet pins";
    case "EDA-INFO-FIXTURE-FLEET":
      return "Fixture fleet pins";
    default:
      return rule;
  }
}
