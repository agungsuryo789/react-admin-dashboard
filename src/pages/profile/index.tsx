import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import DashboardLayout from "../../component/dashboardLayout";
import { userState } from "../../state";

import profile from "../../assets/profile.svg";

const Profile = () => {
  const [user, setUser] = useRecoilState(userState);
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error");
    }

    const data = await res.json();
    console.log("🚀 ~ fetchData ~ data:", data)
	setProfileData(data)
  };
  return (
    <>
      <DashboardLayout>
        <div className="flex flex-col content-center p-4">
          <div className="px-2 py-4 border-b w-full">
            <img
              src={profile}
              alt=""
              className="border-2 bg-black rounded-full w-20"
            />
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Name</p>
            <p>Johnny</p>
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Email</p>
            <p>Johnny@email.com</p>
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Contact</p>
            <p>123123</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
