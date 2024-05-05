import { useState } from "react";
import questions from "../../../public/assets/question";
import useAuth from "../../../utils/useAuth";
import QuestionSection from "../client/QuestionSection";
import { useNavigate } from "react-router-dom";
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import URL from "../../EndPoint";
import ResultCard from "../client/ResultCard";

const TakeTest = () => {
  const { token } = useAuth();
  const [splash, setSplash] = useState(true);
  const [answers, setAnswers] = useState({});
  const [testResults, setTestResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  // Function to handle submitting the test
  const handleSubmit = async (answers) => {
    try {
      const response = await axios.post(
        `${URL}mentalhealth/testapi/`,
        answers,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setTestResults(response.data); // Store the test results
        setIsModalOpen(true); // Open the modal
        toast({
          title: "Test successfully submitted.",
          description: response.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (e) {
      toast({
        title: "Error while submitting.",
        description: e.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.error(e);
    }
  };

  const SplashScreen = () => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="test-page-splash">
        Welcome {token.first_name}. The test will start shortly. We request you
        to complete the test to get your results.
      </div>
      <div className="test-page-splash-note">
        Note: You have to answer each question, only then can you proceed to the
        next question.
      </div>
      <button
        onClick={() => setSplash(false)}
        className="submit-button btn btn-primary mt-3"
      >
        Start Test
      </button>
    </div>
  );

  return (
    <div className="test-page">
      {splash ? (
        <SplashScreen />
      ) : (
        <QuestionSection
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
        />
      )}

      {/* Modal to display the ResultCard */}
      <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false)
          navigate('/dashboard');
        }}>
        <ModalOverlay className=".modal-content"/>
        <ModalContent className=".modal-content">
          <ModalHeader className=".modal-header">Test Result</ModalHeader>
          <ModalCloseButton/>
          <ModalBody className=".modal-body">
            {/* Pass test results to ResultCard */}
            {testResults && <ResultCard result={testResults} />}
          </ModalBody>
          <ModalFooter className=".modal-footer">
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsModalOpen(false);
                navigate("/dashboard");
              }}
              className=".modal-close-button"
            >
              Go To Dashboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TakeTest;
