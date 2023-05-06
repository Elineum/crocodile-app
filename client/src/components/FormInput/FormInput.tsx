import "./FormInput.scss";

interface FormProps {
  text: string;
  type: string;
  name: string;
}

export const FormInput = ({ text, type, name }: FormProps) => {
  return (
    <label className="form-label">
      {text}
      <input type={type} name={name} required />
    </label>
  );
};
