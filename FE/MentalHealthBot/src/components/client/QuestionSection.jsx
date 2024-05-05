/* eslint-disable react/prop-types */
import { useState } from "react";

const QuestionSection = ({ questions, answers, setAnswers, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeNext, setActiveNext] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (Array.isArray(questions[currentQuestionIndex + 1].option))
        setActiveNext(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // console.log(answers);
  };

  // const handlePreviousQuestion = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //   }
  // };

  const handleOptionChange = (e) => {
    setActiveNext(true);
    const { value } = e.target;
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers };
    newAnswers[currentQuestion.variable.name] =
      currentQuestion.variable.options[value];
    // console.log(Object.keys(newAnswers).length);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-section">
      <div className="question">
        <p className="question-text">{currentQuestion.question}</p>
        <div className="options-list">
          {/* Check if currentQuestion.option is an array */}
          {Array.isArray(currentQuestion.option) ? (
            currentQuestion.option.map((opt, index) => (
              <button
                key={index}
                className={`option-button btn btn-outline-primary m-1`}
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionChange({ target: { value: opt } });
                }}
                style={{ marginBottom: "10px", width: "75%" }} // Add margin for buttons
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="option-item">
              {/* If currentQuestion.option is not an array, show a textarea for multiline input */}
              {currentQuestion.variable.name == "age" ? (
                <input
                  type="number"
                  value={answers[currentQuestion.variable.name] || ""}
                  onChange={(e) => {
                    const { value } = e.target; // Get the value of the input
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.variable.name]: value, // Update the specific key-value pair
                    }));
                  }}
                  className="form-control"
                  placeholder="Enter your answer here"
                  style={{ marginBottom: "10px" }} // Add margin for textarea
                />
              ) : (
                <textarea
                  value={answers[currentQuestion.variable.name] || ""}
                  onChange={(e) => {
                    const { value } = e.target; // Get the value of the input
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestion.variable.name]: value, // Update the specific key-value pair
                    }));
                  }}
                  className="form-control"
                  placeholder="Enter your answer here"
                  rows={4}
                  style={{ marginBottom: "10px" }} // Add margin for textarea
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navigation-buttons">
        {/* {currentQuestionIndex > 0 && (
          <button onClick={handlePreviousQuestion} className="nav-button btn btn-secondary">
            Previous
          </button>
        )} */}
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            className={`nav-button btn ${
              !activeNext ? "btn-secondary" : "btn-dark"
            }`}
            disabled={!activeNext}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="submit-button btn btn-primary"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
