import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/register";
import SubscriptionView from "./components/client/SubscriptionView";
import Dashboard from "./components/pages/Dashboard";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/subscription' element={<SubscriptionView />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
