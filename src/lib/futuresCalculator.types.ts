export type FuturesCalculatorInputs = {
  balance: number;
  riskPercent: number;
  stopPercent: number;
  bufferPercent: number;
};

export type FuturesCalculatorOutputs = {
  riskAmount: number;
  effectiveStop: number;
  positionNotional: number;
  minLeverageNeeded: number;
  effectiveLeverage: number;
  marginRequired: number;
};

export type FuturesCalculatorField =
  | "balance"
  | "riskPercent"
  | "stopPercent"
  | "bufferPercent"
  | "leverage"
  | "margin";

export type FuturesCalculatorValidationError = {
  field: FuturesCalculatorField;
  message: string;
};

export type FuturesCalculatorResult = {
  outputs: FuturesCalculatorOutputs | null;
  errors: FuturesCalculatorValidationError[];
};
