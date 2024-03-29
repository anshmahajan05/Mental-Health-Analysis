import NavBar from "../client/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ProfileCard from "../client/ProfileCard";
// import BarChart from "../charts/BarChart";
// import LineChart from "../charts/lineChart";

const Dashboard = () => {
  

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          flexWrap:"wrap",
          justifyContent:"center",
          alignItems:"center",
          width:"95%"
        }}
      >
        <div style={{ display:"flex", padding: "5px", flexDirection: "row", flexWrap:"wrap", margin:"auto", justifyContent:"center" }}>
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
