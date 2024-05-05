/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useEffect } from 'react';

const Chatbox = ({ userChat , messageContent, setMessage , messageSubmit}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages div when userChat updates
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [userChat]);
  
  return (
    <div
      style={{
        minWidth: "300px",
        width: "60%",
        height: "75vh",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        boxSizing: "border-box",
        padding: "20px",
        margin: "10px",
        borderRadius: "10px",
        overflowY: "scroll",
        position: "relative",
        scrollbarWidth: "none", /* Firefox */
        msOverflowStyle: "none", /* IE and Edge */
        "&::-webkit-scrollbar": {
          display: "none" /* WebKit (Chrome, Safari, etc.) */
        }
      }}
    >
      <div
        ref={messagesEndRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          boxSizing: "border-box",
          margin: "10px",
          width:"100%",
          borderRadius: "10px",
          overflowY: "scroll",
          position: "relative",
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none", /* IE and Edge */
          "&::-webkit-scrollbar": {
            display: "none" /* WebKit (Chrome, Safari, etc.) */
          }
        }}
      >
        {userChat.map((message, index) => (
          <div
            key={index}
            style={{
              maxWidth: "70%", // Limit message width to 70% of container
              alignSelf: message.Sender == "User" ? "flex-end" : "flex-start", // Align user messages to the right and bot messages to the left
              backgroundColor: message.Sender == "User" ? "#E6E6E6" : "#DCF8C6", // Different background colors for user and bot messages
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              position: "relative"
            }}
            dangerouslySetInnerHTML={{ __html: message.MessageContent }}
          />
        ))}
      </div>
      <div style={{ marginTop: "auto", width:"100%", paddingLeft:"20px" }}> {/* Align input box to the bottom */}
        <input
          type="text"
          placeholder="Type your message here..."
          style={{
            width: "calc(100% - 70px)", // Adjust width of input box
            padding: "10px",
            borderRadius: "10px 0 0 10px", // Rounded corners on the left side
            border: "none",
            outline: "none",
            borderTop: "1px solid #aaa",
            borderBottom: "1px solid #aaa",
            boxSizing: "border-box"
          }}
          value={messageContent}
          onChange={(e)=>setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && messageContent.trim() !== "") {
              // If Enter key is pressed and messageContent is not empty, call messageSubmit
              e.preventDefault(); // Prevent the default behavior of Enter key
              messageSubmit();
            }
          }}
        />
        <button
          style={{
            width: "70px", // Fixed width for the button
            padding: "10px",
            borderRadius: "0 10px 10px 0", // Rounded corners on the right side
            border: "none",
            outline: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            borderTop: "1px solid #aaa",
            borderBottom: "1px solid #aaa",
            boxSizing: "border-box"
          }}
          onClick={() => messageSubmit()}
        >
          Send
        </button>
      </div>
    </div>
  );
};


export default Chatbox;
