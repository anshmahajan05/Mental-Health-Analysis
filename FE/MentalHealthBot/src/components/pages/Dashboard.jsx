import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../utils/useAuth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const { token, authLogout } = useAuth();
  const userType = token ? token.BU_Type : null;
  const renderUserButtons = () => {
    return (
      <>
        <Link to="/test">
          <Button variant="primary" size="lg" className="mb-2 mx-2">
            Take a Test
          </Button>
        </Link>
        <Link to="/chatbot">
          <Button variant="primary" size="lg" className="mb-2 mx-2">
            Chatbot
          </Button>
        </Link>
        {/* <Button variant="primary" size="lg" className="mb-2 mx-2">Book an Appointment</Button> */}
        {/* <Button variant="primary" size="lg" className="mb-2 mx-2">Manage Bookings</Button>   */}
      </>
    );
  };

  const renderTherapistButtons = () => {
    return (
      <>
        <Link to="/bookings">
          <Button variant="primary" size="lg" className="mb-2 mx-2">
            Manage Bookings
          </Button>
        </Link>
      </>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "30px",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "max-content",
          }}
        >
          <div className="profile-img-container">
            <img
              src="https://cdn.icon-icons.com/icons2/1904/PNG/512/profile_121261.png"
              alt="Your Image"
            />
            <div>
              <div
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >Name: {token.first_name}</div>
              <div
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >Username: {token.username}</div>
            </div>
          </div>
        </div>
        <div>
          {userType === "Customer" && renderUserButtons()}
          {userType === "Therapist" && renderTherapistButtons()}
          <Link to="/">
            <Button
              onClick={async () => {
                localStorage.removeItem("token");
                await authLogout();
              }}
              variant="primary"
              size="lg"
              className="mb-2 mx-2"
            >
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
