import { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/client/NavBar";
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import SubscriptionView from "./components/client/SubscriptionView";
import Dashboard from "./components/pages/Dashboard";
import ChatbotView from "./components/pages/ChatbotView";
import RequireAuth from "./components/RequireAuth";

export const AuthContext = createContext();

const AllRoutes = () => {
  const [token, setToken] = useState(null);
  const authLogin = (token) => {
    setToken(token);
  };
  const authLogout = () => {
    setToken(null);
  };
  const authValues = {
    token,
    authLogin,
    authLogout,
  };

  useEffect(() => {
    const setTokenLocal = () => {
      const  token = localStorage.getItem("token");
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!token) setToken(token);
    }
    setTokenLocal();
  }, []);
  
  return (
    <>
    <AuthContext.Provider value={authValues}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<RequireAuth allowedRoles={["Customer","Therapist"]}/>}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["Customer"]}/>}>
          <Route path='/chatbot' element={<ChatbotView />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["Therapist"]}/>}>
          <Route path='/subscription' element={<SubscriptionView />}></Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
    </>
  );
};

export default AllRoutes;
