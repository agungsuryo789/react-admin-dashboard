import { Link } from "react-router-dom";
interface ButtonBlueProps {
  title: string;
  link: string;
  onClick?: () => void;
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({ title, link, onClick }) => {
  return (
    <Link to={link}>
      <button
        className="bg-blue-500 hover:bg-blue-600 my-2 p-2 rounded-2xl w-80 text-white"
        onClick={onClick}
      >
        {title}
      </button>
    </Link>
  );
};

export default ButtonBlue;
