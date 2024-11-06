import password from '../assets/password.svg'

interface InputPasswordProp {
  val: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<InputPasswordProp> = ({ val, onChange }) => {
  return (
    <div className="flex flex-row border-2 bg-white my-2 p-2 rounded-2xl w-80">
      <img src={password} alt="" className="mr-2 w-6" />
      <input
        className="bg-white w-full focus:outline-none"
        type="password"
        placeholder="password"
		value={val}
		onChange={onChange}
      />
    </div>
  );
};

export default InputPassword;
