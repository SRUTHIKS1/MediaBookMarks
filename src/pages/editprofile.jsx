import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router";
import { editUserDetails } from "../Apiservice/allApi";


const EditProfile = () => {
    const [img, setImg] = useState()
    const navigate = useNavigate()
    const handleImage = (e) => {
        const img = e.target.files[0]
        setImg(img)

    }
    const [userData, setUserData] = useState({
        userId: "",
        name: "",
        email: "",
        address: "",
        contact: "",
        location: ""
    })
    const location = useLocation();
    const user = location.state?.user; //Safe way to access product
    console.log(user)
    useEffect(() => {
        if (user) {
            setUserData(user); // Set user details in state

        }

    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()
            formData.append("img", img)
            formData.append("name", userData.name)
            formData.append("address", userData.address)
            formData.append("contact", userData.contact)
            formData.append("location", userData.location)

            // const token = localStorage.getItem("token");
            // const headers = {
            //     "Content-Type": "multipart/form-data",
            //     "authorization": `Bearer ${token}`
            // };
            const response = await editUserDetails(userData?.userId, formData, headers)
            if (response.status === 200) {
                alert("Profile updated successfully!");

                // Navigate to profile page and pass updated data
                navigate("/profilepage");
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };
    return (

        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 rounded-lg  w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Edit Your Profile
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="relative h-32 w-32">
                        <img
                           src={img? URL.createObjectURL(img):`http://localhost:3000${user?.Image}`}
                            alt=""
                            className="w-32 h-32 rounded-full border-2 border-gray-300 "
                        />
                        <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow ">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImage}

                            />
                        </label>
                    </div>

                    <div>
                        <label className=" text-gray-600 font-medium">
                             Name:
                        </label>
                        <input type="text" name="first" value={userData?.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="w-full px-3 py-2 border rounded-md " required />
                    </div>


                    
                    <div>
                        <label className="text-gray-600 font-medium">
                            Address:
                        </label>
                        <textarea name="adrss" className="w-full px-3 py-2 border rounded-md mb-5 " value={userData?.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} required />
                    </div>
                    <div>
                        <label className="text-gray-600 font-medium">
                            Contact Number:
                        </label>
                        <input type="text" name="cntnmbr" maxLength="10" className="w-full px-3 py-2 border rounded-md mb-5 " value={userData?.contact} onChange={(e) => setUserData({ ...userData, contact: e.target.value })} required />
                    </div>
                    <div>
                        <label className="text-gray-600 font-medium">
                            Location:
                        </label>
                        <input type="text" name="loctn" className="w-full px-3 py-2 border rounded-md mb-5 " value={userData?.location} onChange={(e) => setUserData({ ...userData, location: e.target.value })} required />
                    </div>
                    <div>
                        <label className=" text-gray-600 font-medium">
                            Email:
                        </label>
                        <input type="email" name="email" value={userData?.email} className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    

                    <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>


    )
}
export default EditProfile


