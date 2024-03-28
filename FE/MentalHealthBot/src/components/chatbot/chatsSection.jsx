import "bootstrap/dist/css/bootstrap.min.css";

const ChatsSection = ({ chatList, currentChat, setCurrentChat, newChat }) => {
  return (
    <div
      style={{
        minWidth: "250px",
        width: "15%",
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
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
        "&::-webkit-scrollbar": {
          display: "none" /* WebKit (Chrome, Safari, etc.) */,
        },
      }}
    >
      {chatList.map((chat, index) => {
        const dt = new Date(chat.DateAndTime);
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "10px",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "10px",
              transition: ".3s all ease-in-out",
              width: "100%",
              backgroundColor: index === currentChat ? "white" : "",
            }}
          >
            <button
              style={{
                marginLeft: "10px",
                display: "flex",
                width: "100%",
                alignItems: "center",
              }}
              onClick={() => setCurrentChat(index)}
            >
              {/* <img
                src={chat.image}
                alt={chat.name}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
              /> */}
              <span>{dt.toDateString()}</span>
            </button>
          </div>
        );
      })}

      <div style={{ marginTop: "auto", width: "100%", display:"flex", justifyContent:"center"}}>
        {" "}
        {/* Align input box to the bottom */}
        <button
          style={{
            width: "100%", // Fixed width for the button
            padding: "10px",
            borderRadius: "10px", // Rounded corners on the right side
            border: "none",
            outline: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            borderTop: "1px solid #aaa",
            borderBottom: "1px solid #aaa",
            boxSizing: "border-box",
          }}
          onClick={() => newChat()}
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatsSection;