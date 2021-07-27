type InputTextPropsType = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  touched: boolean | undefined;
};

export const InputText = ({ label, type, name, value, onChange, touched, error }: InputTextPropsType) => (
  <div>
    {touched && error && <div className="modal-warning">{error}</div>}
    <div className="modal-input">
      <label htmlFor={label}>{name}</label>
      <input id={label} type={type} value={value} onChange={onChange} />
    </div>
  </div>
);
