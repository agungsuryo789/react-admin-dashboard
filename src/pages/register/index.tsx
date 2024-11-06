import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ButtonBlue from "../../component/buttonBlue";
import InputPassword from "../../component/inputPw";
import InputEmail from "../../component/inputEmail";
import InputName from "../../component/inputName";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  /* function to handle register action */
  const handleRegister = async () => {
    if (email === "" || password === "" || name === "") return;

	setLoading(true)

    try {
      const res: any = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid request");
      }
	  setLoading(false)
	  navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5">
        <div className="lg:block xl:block justify-items-center content-center hidden lg:col-span-3 xl:col-span-3 bg-gradient-to-t from-blue-700 to-blue-500 p-4 w-full h-svh">
          <h2 className="font-bold text-4xl">GoFinance</h2>
          <p className="my-2 tracking-wide">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
          <ButtonBlue title="Read More" />
        </div>
        <div className="justify-items-center content-center lg:col-span-2 xl:col-span-2 bg-white p-4 w-full h-svh text-black text-left">
          <h3 className="font-bold text-4xl">Hello{"!"}</h3>
          <p className="my-2 tracking-wide">Sign up to get started.</p>
          <div className="flex flex-col">
            <InputName val={name} onChange={(e) => setName(e.target.value)} />
            <InputEmail
              val={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputPassword
              val={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <ButtonBlue title="Register" onClick={handleRegister} disabled={isLoading} />
          </div>
          <div>
            Already have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
