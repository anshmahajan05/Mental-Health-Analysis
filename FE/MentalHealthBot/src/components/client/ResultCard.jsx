/* eslint-disable react/prop-types */

const ResultCard = ({ result }) => {
    // Function to determine the message for diagnosis and treatment
    const getDiagnosisMessage = (pred_diag_pro, pred_treatment) => {
      if (pred_diag_pro == 1 && pred_treatment == 1) {
        return "You should consult a doctor and get treated or diagnosed to feel better.";
      } else if (pred_diag_pro == 1 && pred_treatment == 2) {
        return "You should consult a doctor and get diagnosed to feel better than always.";
      } else if (pred_diag_pro == 2 && pred_treatment == 1) {
        return "You should consult the doctor.";
      } else if (pred_diag_pro == 2 && pred_treatment == 2) {
        return "You seem to be better at the moment. However, if you feel the need to consult a doctor, you can.";
      }
      return "";
    };
  
    // Get the diagnosis message based on the data
    const diagnosisMessage = getDiagnosisMessage(result.pred_diag_pro, result.pred_treatment);
  
    // Compare test date with today's date
    const isTestDateToday = () => {
      const testDate = new Date(result.test_date);
      const today = new Date();
      // Compare only the date (year, month, and day) without considering the time
      return (
        testDate.getFullYear() === today.getFullYear() &&
        testDate.getMonth() === today.getMonth() &&
        testDate.getDate() === today.getDate()
      );
    };
  
    return (
      <div className="result-card">
        {/* Display a small banner if the test was taken today */}
        {isTestDateToday() && (
          <div className="banner">
            This test was taken today.
          </div>
        )}
  
        {/* Display the test date */}
        <div className="test-date">Test Date: {result.test_date}</div>
  
        {/* Display openness */}
        <div className="openness">
          {result.pred_openness === 1
            ? "It seems you prefer to keep things private."
            : result.pred_openness === 2
            ? "You might be open to some interactions, but with caution."
            : "You seem to embrace an open and collaborative approach."}
        </div>
  
        {/* Display diagnosis message */}
        <div className="diagnosis-message">{diagnosisMessage}</div>
      </div>
    );
  };
  
  export default ResultCard;