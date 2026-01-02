import { clamp } from "./math";
import {
  FuturesCalculatorInputs,
  FuturesCalculatorOutputs,
  FuturesCalculatorResult,
} from "./futuresCalculator.types";
import {
  validateFuturesInputs,
  validateFuturesOutputs,
  NOT_POSSIBLE_MESSAGE,
} from "./futuresCalculator.validators";

export function calculateAutoLeverage(
  inputs: FuturesCalculatorInputs,
): FuturesCalculatorResult {
  const inputErrors = validateFuturesInputs(inputs);

  if (inputErrors.length > 0) {
    return {
      outputs: null,
      errors: inputErrors,
    };
  }

  const riskAmount = inputs.balance * (inputs.riskPercent / 100);
  const effectiveStop = (inputs.stopPercent + inputs.bufferPercent) / 100;
  const positionNotional = riskAmount / effectiveStop;
  const minLeverageNeeded = positionNotional / inputs.balance;

  if (minLeverageNeeded > 20) {
    return {
      outputs: null,
      errors: [
        {
          field: "margin",
          message: NOT_POSSIBLE_MESSAGE,
        },
      ],
    };
  }

  const effectiveLeverage = clamp(Math.ceil(minLeverageNeeded), 10, 20);
  const marginRequired = positionNotional / effectiveLeverage;

  const outputs: FuturesCalculatorOutputs = {
    riskAmount,
    effectiveStop,
    positionNotional,
    minLeverageNeeded,
    effectiveLeverage,
    marginRequired,
  };

  const outputErrors = validateFuturesOutputs(inputs, outputs);

  return {
    outputs,
    errors: [...inputErrors, ...outputErrors],
  };
}

export function calculateWithLeverage(
  inputs: FuturesCalculatorInputs,
  leverage: number,
): FuturesCalculatorResult {
  const inputErrors = validateFuturesInputs(inputs);

  if (inputErrors.length > 0) {
    return {
      outputs: null,
      errors: inputErrors,
    };
  }

  const riskAmount = inputs.balance * (inputs.riskPercent / 100);
  const effectiveStop = (inputs.stopPercent + inputs.bufferPercent) / 100;
  const positionNotional = riskAmount / effectiveStop;
  const minLeverageNeeded = positionNotional / inputs.balance;

  if (minLeverageNeeded > 20) {
    return {
      outputs: null,
      errors: [
        {
          field: "margin",
          message: NOT_POSSIBLE_MESSAGE,
        },
      ],
    };
  }

  const outputs: FuturesCalculatorOutputs = {
    riskAmount,
    effectiveStop,
    positionNotional,
    minLeverageNeeded,
    effectiveLeverage: leverage,
    marginRequired: positionNotional / leverage,
  };

  const outputErrors = validateFuturesOutputs(inputs, outputs);

  return {
    outputs,
    errors: [...inputErrors, ...outputErrors],
  };
}
