interface ButtonBlueProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({
  title,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={` hover:bg-blue-600 my-2 p-2 rounded-2xl w-80 text-white ${
        disabled ? "bg-gray-400" : "bg-blue-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ButtonBlue;
