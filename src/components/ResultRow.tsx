type ResultRowProps = {
  label: string;
  value: string;
  hint?: string;
};

export default function ResultRow({ label, value, hint }: ResultRowProps) {
  return (
    <div className="result-row">
      <span className="result-label">{label}</span>
      <span className="result-value">{value}</span>
      {hint ? <span className="result-hint">{hint}</span> : null}
    </div>
  );
}
