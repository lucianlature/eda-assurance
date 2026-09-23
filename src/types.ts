export type ContractKind = "event" | "command" | "query" | "subject";

export type Contract = {
  id: string;
  kind: ContractKind;
  source: string;
  requiredFields: string[];
};

export type Binding = {
  service: string;
  contract: string;
  role: "producer" | "consumer";
  source: string;
};

export type Finding = {
  rule: string;
  severity: "high" | "medium" | "info";
  contract?: string;
  detail: string;
  evidence: string[];
};

export type ConsumerRequire = {
  contract: string;
  service: string;
  fields: string[];
  source: string;
  deployedCommit?: string;
};

export type ExtractorHit = {
  extractor: string;
  contracts: Contract[];
  bindings: Binding[];
  consumerRequires?: ConsumerRequire[];
  rollingWindowSeconds?: number;
};

export type Topology = {
  root: string;
  extractors: string[];
  rollingWindowSeconds?: number;
  contracts: Array<{
    id: string;
    kind: ContractKind;
    requiredFields: string[];
    producers: string[];
    consumers: string[];
    consumerRequires: Array<{
      service: string;
      fields: string[];
      deployedCommit?: string;
      source: string;
    }>;
    sources: string[];
  }>;
};
