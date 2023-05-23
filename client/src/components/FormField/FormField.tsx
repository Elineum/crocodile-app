import "./FormField.scss";

interface FieldProps {
  children: string;
  type: string;
  name: string;
  id: string;
}

export const FormField = ({ children, type, name, id }: FieldProps) => {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {children}
      </label>
      <input
        className="field__input"
        type={type}
        name={name}
        id={id}
        required
      />
    </div>
  );
};
