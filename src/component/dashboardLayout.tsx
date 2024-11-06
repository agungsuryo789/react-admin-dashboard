import { useState } from "react";
import { Link } from "react-router-dom";

interface DashboardLayoutProp {
  children: JSX.Element;
}

const DashboardLayout: React.FC<DashboardLayoutProp> = ({ children }) => {
  const [isSidebar, setSidebar] = useState(false);
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
            <button onClick={() => setSidebar(!isSidebar)}>X</button>
          </div>
          <ul>
            <li className="hover:bg-blue-700 p-2 rounded">
              <Link to="/dashboard" className="w-full">Home</Link>
            </li>
            <li className="hover:bg-blue-700 p-2 rounded">
              <Link to="/profile" className="w-full">Profile</Link>
            </li>
            <li className="hover:bg-blue-700 p-2 rounded">
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col flex-1">
          <nav className="flex justify-between bg-blue-500 shadow-lg h-14 text-white">
            <div className="content-center px-2">
              {isSidebar ? (
                <button onClick={() => setSidebar(!isSidebar)}>{"<=="}</button>
              ) : (
                <button onClick={() => setSidebar(!isSidebar)}>{"==>"}</button>
              )}
            </div>
            <div className="flex flex-row content-center px-2">
              <img src="" alt="Avatar" className="m-auto rounded-xl w-20" />
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
