import Forgotpassword from "./pages/forgotpassword"
import Login from "./pages/login"
import Register from "./pages/register"
import ResetPassword from "./pages/resetpassword"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router";
import Folderpage from "./pages/folder";
import ProfilePage from "./pages/profile";
import Navbar from "./component/navbar";
import Bookmarks from "./pages/bookmarks";
import { Provider } from "react-redux";
import { store } from "./reduxtoolkit/store";





function App() {
  return (
    <> 
    <BrowserRouter>
    <Provider store={store}>
    <Routes>
       <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
           <Route path="/folder" element={<Folderpage />} />
            <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </Provider>
    </BrowserRouter>
    </>

  )
}





export default App
