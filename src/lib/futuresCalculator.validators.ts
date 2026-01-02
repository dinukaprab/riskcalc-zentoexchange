import {
  FuturesCalculatorInputs,
  FuturesCalculatorOutputs,
  FuturesCalculatorValidationError,
} from "./futuresCalculator.types";

export const NOT_POSSIBLE_MESSAGE =
  "Trade not possible within 10x-20x leverage range.";

const isFiniteNumber = (value: number) => Number.isFinite(value);

export function validateFuturesInputs(
  inputs: FuturesCalculatorInputs,
): FuturesCalculatorValidationError[] {
  const errors: FuturesCalculatorValidationError[] = [];

  if (!isFiniteNumber(inputs.balance) || inputs.balance <= 0) {
    errors.push({
      field: "balance",
      message: "Wallet balance must be greater than 0.",
    });
  }

  if (!isFiniteNumber(inputs.riskPercent) || inputs.riskPercent <= 0) {
    errors.push({
      field: "riskPercent",
      message: "Risk per trade must be greater than 0%.",
    });
  }

  if (!isFiniteNumber(inputs.stopPercent) || inputs.stopPercent <= 0) {
    errors.push({
      field: "stopPercent",
      message: "Stop loss distance must be greater than 0%.",
    });
  }

  if (!isFiniteNumber(inputs.bufferPercent) || inputs.bufferPercent < 0) {
    errors.push({
      field: "bufferPercent",
      message: "Fee and slippage buffer must be 0% or higher.",
    });
  }

  return errors;
}

export function validateFuturesOutputs(
  inputs: FuturesCalculatorInputs,
  outputs: FuturesCalculatorOutputs,
): FuturesCalculatorValidationError[] {
  const errors: FuturesCalculatorValidationError[] = [];

  if (
    !isFiniteNumber(outputs.effectiveLeverage) ||
    outputs.effectiveLeverage < 10 ||
    outputs.effectiveLeverage > 20
  ) {
    errors.push({
      field: "leverage",
      message: "Leverage must stay within 10x and 20x.",
    });
  }

  if (!isFiniteNumber(outputs.marginRequired)) {
    errors.push({
      field: "margin",
      message: "Margin required must be a valid number.",
    });
  } else if (outputs.minLeverageNeeded > 20) {
    errors.push({
      field: "margin",
      message: NOT_POSSIBLE_MESSAGE,
    });
  } else if (outputs.marginRequired > inputs.balance) {
    errors.push({
      field: "margin",
      message: "Margin required must not exceed wallet balance.",
    });
  }

  return errors;
}
