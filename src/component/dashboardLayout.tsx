import { useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";
import { useNavigate } from "react-router-dom";

import profile from "../assets/profile.svg";
import menu from "../assets/menuwhite.png";

interface DashboardLayoutProp {
  children: JSX.Element;
}

const DashboardLayout: React.FC<DashboardLayoutProp> = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebar, setSidebar] = useState(false);
  const setUser = useSetRecoilState(userState);

  const handleLogout = () => {
    setUser({ isAuth: false, email: "" });
    localStorage.removeItem("userState");
    navigate("/");
  };

  return (
    <>
      <div className="relative flex h-screen">
        <div
          className={`absolute left-0 h-screen space-y-4 bg-blue-500 p-4 w-64 text-white ${
            isSidebar ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-row justify-between font-semibold text-xl">
            <span>Dashboard</span>
            <button className="hover:scale-125" onClick={() => setSidebar(!isSidebar)}>X</button>
          </div>
          <ul>
            <li className="hover:bg-blue-700 p-2 rounded">
              <Link to="/dashboard" className="w-full">
                Home
              </Link>
            </li>
            <li className="hover:bg-blue-700 p-2 rounded">
              <Link to="/profile" className="w-full">
                Profile
              </Link>
            </li>
            <li className="hover:bg-blue-700 p-2 rounded">
              <button className="w-full text-left" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-col flex-1">
          <nav className="flex justify-between bg-blue-500 shadow-lg h-14 text-white">
            <div className="content-center px-2">
              <button onClick={() => setSidebar(!isSidebar)} className="hover:border-2">
				<img src={menu} alt="" className="my-auto w-10" />
			  </button>
            </div>
            <div className="flex flex-row content-center px-2">
              <img
                src={profile}
                alt="Avatar"
                className="m-auto mr-2 rounded-xl w-8"
              />
              <span className="m-auto">John@email.com</span>
            </div>
          </nav>

          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
