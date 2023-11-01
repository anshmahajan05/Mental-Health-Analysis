import NavBar from "./components/client/NavBar";
import LoginForm from "./components/client/LoginForm";

const Login = () => {
  return (
    <>
      <NavBar />
      <div style={{ flex: 1, padding: "5px" }}>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
