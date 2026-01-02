"use client";

import { useEffect, useMemo, useState } from "react";
import InputField from "@/components/InputField";
import ResultRow from "@/components/ResultRow";
import WarningBox from "@/components/WarningBox";
import {
  calculateAutoLeverage,
  calculateWithLeverage,
} from "@/lib/futuresCalculator";
import { formatCurrency, formatLeverage } from "@/lib/format";

const defaultInputs = {
  balance: "1000",
  riskPercent: "1",
  stopPercent: "2",
  bufferPercent: "0.1",
};

const parseNumber = (value: string): number => {
  if (value.trim() === "") {
    return Number.NaN;
  }

  return Number(value);
};

export default function Calculator() {
  const [balance, setBalance] = useState(defaultInputs.balance);
  const [riskPercent, setRiskPercent] = useState(defaultInputs.riskPercent);
  const [stopPercent, setStopPercent] = useState(defaultInputs.stopPercent);
  const [bufferPercent, setBufferPercent] = useState(defaultInputs.bufferPercent);
  const [leverage, setLeverage] = useState(10);

  const inputs = useMemo(
    () => ({
      balance: parseNumber(balance),
      riskPercent: parseNumber(riskPercent),
      stopPercent: parseNumber(stopPercent),
      bufferPercent: parseNumber(bufferPercent),
    }),
    [balance, riskPercent, stopPercent, bufferPercent],
  );

  const autoCalculation = useMemo(
    () => calculateAutoLeverage(inputs),
    [inputs],
  );
  const calculation = useMemo(
    () => calculateWithLeverage(inputs, leverage),
    [inputs, leverage],
  );

  useEffect(() => {
    if (!autoCalculation.outputs) {
      return;
    }

    const minimumLeverage = autoCalculation.outputs.effectiveLeverage;
    if (leverage < minimumLeverage) {
      setLeverage(minimumLeverage);
    }
  }, [autoCalculation.outputs, leverage]);

  const outputs = calculation.outputs;

  const riskAmount = outputs ? formatCurrency(outputs.riskAmount) : "--";
  const marginRequired = outputs ? formatCurrency(outputs.marginRequired) : "--";
  const effectiveLeverage = outputs
    ? formatLeverage(outputs.effectiveLeverage)
    : "--";

  const errors = calculation.errors.map((error) => error.message);

  return (
    <section className="calculator">
      <header className="calculator-header">
        <h1>USDT-M Futures Risk Calculator</h1>
        <p>Risk-first sizing with adjustable 10x-20x leverage control.</p>
      </header>

      <div className="calculator-grid">
        <div className="calculator-panel">
          <h2>Account</h2>
          <InputField
            id="balance"
            label="Wallet balance"
            value={balance}
            onChange={setBalance}
            unit="USDT"
            min={0}
            placeholder="e.g. 1500"
            error={calculation.errors.find((error) => error.field === "balance")
              ?.message}
          />
          <InputField
            id="riskPercent"
            label="Risk per trade"
            value={riskPercent}
            onChange={setRiskPercent}
            unit="%"
            min={0}
            step={0.01}
            placeholder="e.g. 1"
            error={
              calculation.errors.find((error) => error.field === "riskPercent")
                ?.message
            }
          />
          <InputField
            id="stopPercent"
            label="Stop loss distance (no leverage)"
            value={stopPercent}
            onChange={setStopPercent}
            unit="%"
            min={0}
            step={0.01}
            placeholder="e.g. 2"
            error={
              calculation.errors.find((error) => error.field === "stopPercent")
                ?.message
            }
          />
          <InputField
            id="bufferPercent"
            label="Fee + slippage buffer"
            value={bufferPercent}
            onChange={setBufferPercent}
            unit="%"
            min={0}
            step={0.01}
            placeholder="e.g. 0.1"
            error={
              calculation.errors.find((error) => error.field === "bufferPercent")
                ?.message
            }
          />
        </div>

        <div className="calculator-panel">
          <h2>Risk Settings</h2>
          <ResultRow label="Risk amount" value={riskAmount} />
          <ResultRow label="Required margin" value={marginRequired} />
          <ResultRow label="Effective leverage" value={effectiveLeverage} />
          <label className="slider-field" htmlFor="leverage">
            <span className="input-label">Adjust leverage</span>
            <span className="slider-control">
              <input
                id="leverage"
                type="range"
                min={10}
                max={20}
                step={1}
                value={leverage}
                onChange={(event) => setLeverage(Number(event.target.value))}
              />
              <span className="slider-value">{leverage}x</span>
            </span>
          </label>
          <WarningBox messages={errors} />
        </div>
      </div>
    </section>
  );
}
