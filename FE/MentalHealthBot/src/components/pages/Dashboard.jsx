import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../utils/useAuth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { token, authLogout } = useAuth();
  const userType = token ? token.type : null;
  const renderUserButtons = () => {
    return (
      <>
        <Link to="/test">
          <Button variant="primary" size="lg" className="mb-2 mx-2">
            Take a Test
          </Button>
        </Link>
        <Link to="/results">
          <Button variant="primary" size="lg" className="mb-2 mx-2">
            See Scores
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
          padding: "5px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width: "95%",
        }}
      >
        {renderUserButtons()}
        {userType === "user" && renderUserButtons()}
        {userType === "therapist" && renderTherapistButtons()}
        <Link to="/">
          <Button onClick={async()=>{
            localStorage.removeItem('token');
            await authLogout()
          }} variant="primary" size="lg" className="mb-2 mx-2">
            Logout
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
