import { useEffect, useState } from "react"
import { getUserDetails } from "../Apiservice/allApi"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [user, setUser] = useState({})
  const [img, setImg] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userCredential"));
    const userid = userData?.userId;
    if (!userid) return;

    const get = async () => {
      try {
        const usrD = await getUserDetails(userid);
        console.log("Fetched user:", usrD?.data?.data);
        setUser(usrD?.data?.data);
        setImg(usrD?.data?.data?.Image);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    get();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-indigo-300 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="relative h-32 w-32 mx-auto">
           <img
                    src={img ? `http://localhost:3000${img}` : ""}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
                  />
        </div>

        <div className="flex flex-col justify-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{user?.name || "User Name"}</h2>
          {/* <p className="text-gray-500">{user?.email || "Email not available"}</p> */}

          <button
            className="mt-4 w-full bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            onClick={() => navigate("/editprofile", { state: { user } })}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
