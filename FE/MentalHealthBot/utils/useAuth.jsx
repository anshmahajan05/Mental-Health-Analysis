import { useContext } from "react";
import { AuthContext } from "../src/allRoutes";

const useAuth = () => {
    return useContext(AuthContext);
}   

export default useAuth;