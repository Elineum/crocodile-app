import "./Button.scss";

interface ButtonProps {
  children: string;
  eventFunc?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, eventFunc }: ButtonProps) => {
  return (
    <button className="button" onClick={eventFunc}>
      {children}
    </button>
  );
};
