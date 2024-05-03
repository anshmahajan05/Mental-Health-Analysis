import { useState, useEffect } from "react";
import questions from "../../../public/assets/question";
import useAuth from "../../../utils/useAuth";
import QuestionSection from "../client/QuestionSection";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import URL from "../../EndPoint";
import axios from "axios";

const TakeTest = () => {
  const { token } = useAuth();
  const [splash, setSplash] = useState(true);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (answers) => {
    try {
      const response = await axios.post(`${URL}mentalhealth/testapi/`, 
      answers,
      {
        headers: {
          "Content-Type": "application/json", // Set the content type of the request
          Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
        },
      });
      // console.log(response);
      if (response.status === 200) {
        navigate('/dashboard');
        toast({
            title: `Test successfully submitted.`,
            description: response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
    } catch (e) {
      toast({
        title: `Error while submitting.`,
        description: e.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    }
    // console.log("Form data submitted:", formData);
  };

  const SplashScreen = () => (
    <div style={{display: "flex", flexDirection:"column"}}>
      <div className="test-page-splash">
        Welcome {token.first_name}. The test will start shortly. We request you to
        complete the test to get your results...
      </div>
      <div>
        Note: You have to answer each question else you cannot submit the test.
      </div>
    </div>
  );

  useEffect(() => {
    const splashChange = () => {
      setSplash(false);
    };

    setTimeout(splashChange, 3000);
  }, []);

  return (
    <div className="test-page">
      {splash ? (
        <SplashScreen />
      ) : (
        <QuestionSection
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={(answers) => {
            handleSubmit(answers);
          }}
        />
      )}
    </div>
  );
};

export default TakeTest;
