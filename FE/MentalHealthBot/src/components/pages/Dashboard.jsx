import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../utils/useAuth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import ProfileCard from "../client/ProfileCard";
// import BarChart from "../charts/BarChart";
// import LineChart from "../charts/lineChart";

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
        {/* <div style={{ display:"flex", padding: "5px", flexDirection: "row", flexWrap:"wrap", margin:"auto", justifyContent:"center" }}>
          <div className="dashboard-chart">
            {/* <BarChart /> */}
          </div>
          <div className="dashboard-chart">
            {/* <LineChart /> */}
            </div>
        </div>
        <div style={{ border:"none", height:"300px", flexWrap:"wrap", width:"100%" }} className="dashboard-chart">
            <ProfileCard name={"Dr. Ayush Kumar"} qual={"MD. MS."}/>
            <ProfileCard name={"Dr. Ansh Mahajan"} qual={"MD. MS."}/>
            <ProfileCard name={"Dr. Neha Bhavsar"} qual={"MD. MS."}/>
            <ProfileCard name={"Dr. Swarda Mashere"} qual={"MD. MS."}/>
        </div>
        <div style={{ display:"flex", border:"solid",margin:"0px", width:"100%"}} className="dashboard-chart">
            User Data
        </div> */}
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
