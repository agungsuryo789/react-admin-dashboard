import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import DashboardLayout from "../../component/dashboardLayout";
import { userState } from "../../state";

const Profile = () => {
  const user = useRecoilValue(userState);
  const [profileData, setProfileData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = user.accessToken;
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error");
    }

    const data = await res.json();
    setProfileData(data);
  };
  return (
    <>
      <DashboardLayout>
        <div className="flex flex-col content-center p-4">
          <div className="px-2 py-4 border-b w-full">
            <img
              src={profileData.image}
              alt=""
              className="border-2 bg-black rounded-full w-20"
            />
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Name</p>
            <p>
              {profileData.firstName} {profileData.lastName}
            </p>
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Role</p>
            <p>{profileData.role}</p>
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Email</p>
            <p>{profileData.email}</p>
          </div>
          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">Contact</p>
            <p>{profileData.phone}</p>
          </div>

          <div className="px-2 py-4 border-b w-full">
            <p className="font-bold tracking-wide">University</p>
            <p>{profileData.university}</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Profile;
