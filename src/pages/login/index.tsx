import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../../state";

import ButtonBlue from "../../component/buttonBlue";
import InputPassword from "../../component/inputPw";
import InputEmail from "../../component/inputEmail";

const Login = () => {
  const [email, setEmail] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");
  const setUser = useSetRecoilState(userState); /* setter action for the user state */
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  /* function to handle login action */
  const handleLogin = async () => {
    if (email === "" || password === "") return;

    setLoading(true);
    try {
      const res: any = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      const newUserState = {
        isAuth: true,
        email: data.email,
        accessToken: data.accessToken,
      };
      setUser(newUserState);
      localStorage.setItem("userState", JSON.stringify(newUserState));
      setLoading(false);
      navigate("/dashboard");
    } catch (error: unknown) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5">
      <div className="lg:block xl:block justify-items-center content-center hidden lg:col-span-3 xl:col-span-3 bg-gradient-to-t from-blue-700 to-blue-500 p-4 h-svh">
        <h2 className="font-bold text-4xl">GoFinance</h2>
        <p className="my-2 tracking-wide">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <ButtonBlue title="Read More" />
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
          <ButtonBlue
            title="Login"
            onClick={handleLogin}
            disabled={isLoading}
          />
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
