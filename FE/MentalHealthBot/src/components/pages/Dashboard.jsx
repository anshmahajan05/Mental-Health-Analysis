/* eslint-disable no-extra-boolean-cast */
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../../../utils/useAuth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import URL from "../../EndPoint";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import ResultCard from "../client/ResultCard";

const Dashboard = () => {
  const { token } = useAuth();
  const toast = useToast();
  const userType = token ? token.BU_Type : null;
  const [testResults, setTestResults] = useState([]);
  const [loader, setLoader] = useState(true);
  const getUserResults = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${URL}mentalhealth/testapi/`, {
        headers: {
          "Content-Type": "application/json", // Set the content type of the request
          Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
        },
      });
      // console.log(response.data.results);
      setTestResults(response?.data?.results || []);
      setLoader(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `Error in fetching results.`,
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    getUserResults();
  }, []);
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
          width: "100%",
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
              >
                Name: {token.first_name}
              </div>
              <div
                style={{
                  paddingLeft: "5px",
                  paddingRight: "5px",
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Username: {token.username}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {userType == "Customer" && renderUserButtons()}
          {userType == "Therapist" && renderTherapistButtons()}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          Your Previous Results:{" "}
          <Button
            variant="primary"
            size="sm"
            className="mb-2 mx-2"
            onClick={getUserResults}
          >
            Refresh
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "95%",
          }}
        >
          {loader ? (
            <div>Loading...</div>
          ) : testResults.length == 0 ? (
            <div>You have not taken any tests yet.</div>
          ) : (
            testResults.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
