import NavBar from "../client/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ProfileCard from "../client/ProfileCard";
import { Chart } from "react-google-charts";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540],
  ];
  
  export const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };
  export const data1 = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
  export const options1 = {
    title: "My Daily Activities",
  };
  

const Login = () => {
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
          <Chart
            chartType="AreaChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
            />
          </div>
          <div className="dashboard-chart">
          <Chart
            chartType="PieChart"
            data={data1}
            options={options1}
            width={"100%"}
            height={"300px"}
            />
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

export default Login;
