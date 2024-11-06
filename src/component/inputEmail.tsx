import email from '../assets/email.svg'

interface InputEmailProps {
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputEmail: React.FC<InputEmailProps> = ({ val, onChange }) => {
  return (
    <div className="flex flex-row border-2 bg-white my-2 p-2 rounded-2xl w-80">
      <img src={email} alt="" className="mr-2 w-8" />
      <input
        className="bg-white w-full focus:outline-none"
        type="email"
        placeholder="email"
		value={val}
		onChange={onChange}
      />
    </div>
  );
};

export default InputEmail;
