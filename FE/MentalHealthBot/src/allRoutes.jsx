import { createContext, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/client/NavBar";
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import SubscriptionView from "./components/client/SubscriptionView";
import Dashboard from "./components/pages/Dashboard";
import ChatbotView from "./components/pages/ChatbotView";
import RequireAuth from "./components/RequireAuth";
import TakeTest from "./components/pages/TakeTest";

export const AuthContext = createContext();

const AllRoutes = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const authLogin = (token) => {
    setToken(token);
  };
  const authLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    const setTokenLocal = () => {
      const  tempToken = localStorage.getItem("token");
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!tempToken) {
        setToken(tempToken)
        navigate('/dashboard');
      }
    }
    setTokenLocal();
  }, []);
  
  return (
    <>
    <AuthContext.Provider value={{token, authLogin, authLogout}}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<RequireAuth allowedRoles={["Customer","Therapist"]}/>}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["Customer"]}/>}>
          <Route path='/chatbot' element={<ChatbotView />}></Route>
          <Route path='/test' element={<TakeTest />}></Route> 
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
