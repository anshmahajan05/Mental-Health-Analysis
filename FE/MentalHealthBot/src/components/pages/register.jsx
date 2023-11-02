import NavBar from "../client/NavBar";
import SignUpPage from "../client/RegistrationForm";

const Register = () => {
  return (
    <>
      <NavBar />
      <div style={{ flex: 1, padding: "5px" }}>
        <SignUpPage />
      </div>
    </>
  );
};

export default Register;
