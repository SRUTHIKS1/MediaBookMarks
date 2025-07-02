import { useEffect, useState } from "react";
import { login } from "../Apiservice/allApi";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateIsLoggedIn } from "../reduxtoolkit/slice";

const Login = () => {

    
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const successNotification = () => toast('successfully login', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
    });
    const errorNotification = () => toast('Login failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const result = await login(userDetails)
            console.log(result)

            if (result.status === 200) {
                successNotification()
               
                const userCredentials={
                    userId:result.data.userDetails.userId,
                    name:result.data.userDetails.name,
                    email:result.data.userDetails.email,
                    password:result.data.userDetails.password,
                    

                }
                localStorage.setItem("userCredential",JSON.stringify(userCredentials))
                
               localStorage.setItem("token",JSON.stringify(result.data.token))

               dispatch(updateIsLoggedIn(true))
             
               navigate('/home');
              
            } else {
                errorNotification()
            }


        } catch (error) {
            return error

        }
        alert(`userName:${userDetails.name}\n email:${userDetails.email}\n password:${userDetails.password}\n
                `)



    }
    
    return (

       <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')",
      }}
    >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4" ><u>Login with Email</u></h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label>Email</label>
                        <input onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mt-1" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mt-1" />
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            Login
                        </button>
                    </div>

                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition={Bounce}
            />

        </div>

    )
}
export default Login;