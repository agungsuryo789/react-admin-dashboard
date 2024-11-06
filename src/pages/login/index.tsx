import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../state";

import ButtonBlue from "../../component/buttonBlue";
import InputPassword from "../../component/inputPw";
import InputEmail from "../../component/inputEmail";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  // Persist the user state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user]);

  const handleLogin = () => {
    if (email === "" || password === "") return;

    setUser({ isAuth: true, email: email });
    navigate("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5">
      <div className="lg:block xl:block justify-items-center content-center hidden lg:col-span-3 xl:col-span-3 bg-gradient-to-t from-blue-700 to-blue-500 p-4 h-svh">
        <h2 className="font-bold text-4xl">GoFinance</h2>
        <p className="my-2 tracking-wide">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <ButtonBlue title="Read More" link="#" />
      </div>
      <div className="justify-items-center content-center lg:col-span-2 xl:col-span-2 bg-white p-4 w-full h-svh text-black text-left">
        <h3 className="font-bold text-4xl">Hello Again{"!"}</h3>
        <p className="my-2 tracking-wide">Welcome back</p>
        <div className="flex flex-col">
          <InputEmail val={email} onChange={(e) => setEmail(e.target.value)} />
          <InputPassword
            val={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <ButtonBlue title="Login" link="#" onClick={handleLogin} />
          <button className="hover:bg-slate-300 my-2 p-2 rounded-xl w-80 hover:text-white">
            forgot password
          </button>
        </div>
        <span>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-500">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
