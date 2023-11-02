import NavBar from "../client/NavBar";
import LoginForm from "../client/LoginForm";

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
