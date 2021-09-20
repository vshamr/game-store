type InputTextPropsType = {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
  touched: boolean | undefined;
};

const InputText = ({ label, type, name, value, onChange, touched, error }: InputTextPropsType) => (
  <div>
    {touched && error && <div className="modal__warning">{error}</div>}
    <div className="modal__input">
      <label htmlFor={label}>{name}</label>
      <input id={label} type={type} value={value} onChange={onChange} />
    </div>
  </div>
);

export default InputText;
