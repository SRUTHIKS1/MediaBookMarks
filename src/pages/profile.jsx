import { useEffect, useState } from "react";
import { getUserDetails } from "../Apiservice/allApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

const Profile = () => {
  const [user, setUser] = useState({});
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCredential"));
    const userId = userData?.userId;
    if (!userId) return;

    const get = async () => {
      try {
        const usrD = await getUserDetails(userId);
        setUser(usrD?.data?.data);
        setImg(usrD?.data?.data?.Image);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    get();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex justify-center items-center bg-gray-100"
    style={{
        backgroundImage: "url(https://www.shutterstock.com/image-photo/digital-bookmark-internet-data-technology-260nw-469621283.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
        {/* Header Section */}
        <div className="flex items-center gap-6 border-b pb-6">
          <img
            src={img ? `http://localhost:3000${img}` : "/default-user.png"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.name || "User Name"}
            </h1>
            <p className="text-sm text-gray-500">{user?.email || "user@email.com"}</p>
            <p className="text-sm text-gray-500">{user?.mobile ? `📞 ${user.mobile}` : ""}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-500">Username</p>
            <p>{user?.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Registered On</p>
            <p>{new Date(user?.createdAt).toLocaleDateString() || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">User ID</p>
            <p>{user?.userId || "N/A"}</p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/editprofile", { state: { user } })}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Profile;
