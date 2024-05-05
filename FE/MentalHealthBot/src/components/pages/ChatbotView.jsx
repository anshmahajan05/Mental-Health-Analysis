import "bootstrap/dist/css/bootstrap.min.css";
import Chatbox from "../chatbot/chatDisplay";
import ChatsSection from "../chatbot/chatsSection";
import { useState, useEffect } from "react";
import URL from "../../EndPoint";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../../utils/useAuth";

const ChatbotView = () => {
  const [list, setList] = useState([]);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(0);
  const [message, setMessage] = useState("");
  const [submitMsg, setSubmitMsg] = useState(false);
  const { token } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const response1 = await axios.get(`${URL}mentalhealth/chathistory/`, {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
          },
        });
        const chats = response1.data.chats;
        setList(chats);
        // line chats[0] must be changed to chats[chats.length -1]
        const response2 = await axios.post(
          `${URL}mentalhealth/chathistory/`,
          { ChatId: chats[chats.length - 1].id },
          {
            headers: {
              "Content-Type": "application/json", // Set the content type of the request
              Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
            },
          }
        );
        setChat(response2.data?.messages);
        setCurrentChat(chats.length - 1);
      } catch (e) {
        toast({
          title: `Error in fetching logs.`,
          description: e.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        console.log(e);
      }
    };

    getChatHistory();
  }, []);

  const messageSubmit = async () => {
    setSubmitMsg(true);
    try {
      const newMessage = {
        ChatID_id: 1,
        MessageContent: message,
        Sender: "User",
        SentDateTime: new Date(),
        Status: "success",
        id: chat.length,
      };
      chat.push(newMessage);
      setMessage("");
      const response = await axios.post(
        `${URL}mentalhealth/chatbot/`,
        { message: newMessage.MessageContent, ChatId: list[currentChat].id },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
          },
        }
      );
      chat.push(response.data.reply);
    } catch (e) {
      toast({
        title: `Error sending message.`,
        description: e.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    } finally {
      setSubmitMsg(false);
    }
  };
  const updateChat = async (id) => {
    try {
      const response2 = await axios.post(
        `${URL}mentalhealth/chathistory/`,
        { ChatId: id },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
          },
        }
      );
      setChat(response2.data?.messages);
    } catch (e) {
      toast({
        title: `Error in fetching logs.`,
        description: e.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    }
  };

  const newChat = async () => {
    try {
      const len = list.length;
      const response = await axios.post(
        `${URL}mentalhealth/newchat/`,
        { isTestGiven: "false", TestId: null },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type of the request
            Authorization: "Bearer " + token.access_token, // Replace with your access token or any other custom headers
          },
        }
      );
      setList((prev)=>[...prev, response.data.chatid]);
      updateChat(response.data.chatid.id);
      setCurrentChat(len);
    } catch (e) {
      toast({
        title: `Unable to create a new chat.`,
        description: e.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.log(e);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "5px",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <ChatsSection
          chatList={list}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          newChat={newChat}
          updateChat={updateChat}
        />
        <Chatbox
          userChat={chat}
          messageContent={message}
          setMessage={setMessage}
          messageSubmit={messageSubmit}
          submitMsg={submitMsg}
        />
      </div>
    </>
  );
};

export default ChatbotView;
