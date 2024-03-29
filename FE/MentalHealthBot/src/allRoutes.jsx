import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import SubscriptionView from "./components/client/SubscriptionView";
import Dashboard from "./components/pages/Dashboard";
import ChatbotView from "./components/pages/ChatbotView";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/subscription' element={<SubscriptionView />}></Route>
        <Route path='/chatbot' element={<ChatbotView />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
