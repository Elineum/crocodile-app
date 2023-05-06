import "./FormButton.scss";

interface FormProps {
  text: string;
}

export const FormButton = ({ text }: FormProps) => {
  return <button>{text}</button>;
};
