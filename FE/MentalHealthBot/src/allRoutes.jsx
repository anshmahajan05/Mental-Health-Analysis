import { Route, Routes } from "react-router-dom";
import Login from "./Login";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
