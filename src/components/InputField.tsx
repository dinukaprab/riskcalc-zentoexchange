type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
  min?: number;
  step?: number;
  error?: string;
};

export default function InputField({
  id,
  label,
  value,
  onChange,
  unit,
  placeholder,
  min,
  step,
  error,
}: InputFieldProps) {
  return (
    <label className="input-field" htmlFor={id}>
      <span className="input-label">{label}</span>
      <span className="input-control">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
        />
        {unit ? <span className="input-unit">{unit}</span> : null}
      </span>
      {error ? <span className="input-error">{error}</span> : null}
    </label>
  );
}
