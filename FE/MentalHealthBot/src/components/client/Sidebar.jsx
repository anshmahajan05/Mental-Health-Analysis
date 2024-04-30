import "./Sidebar.css";

function Sidebar() {
  return (
    <div
      className='sidenav'
      style={{ height: "100vh", width: "25%", padding: "30px" }}>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <div style={{ marginTop: "30px" }}>
          <div className='navItem'>
            <div className='Pad'>
              <p>Welcome Back to MentalMate!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
