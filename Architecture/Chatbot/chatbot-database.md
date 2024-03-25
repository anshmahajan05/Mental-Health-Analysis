There are three tables associated with the chatbot:

**Chat_History Table** : The Chat History table serves as a central repository for storing all the conversation details between users and the chatbot. It acts like a memory bank, allowing the chatbot to track past interactions and build context for future ones.
<br><br>Following are the attributes for it:

<br>a. ChatID ( Primary Key ): A unique identifier assigned to each individual chat conversation.

<br>b. UserID ( Foreign Key ): This links a specific chat conversation to the user it belongs to. It references the ID of the  Mst_Usr_Tbl table.

<br>c. TestID ( Foreign Key ): Reference the ID of the Test details.

<br>d. isTestGiven : Boolean field to check whether user has given the test or not.

<br>e. start_date_and_time: Specifies the date and time of the chat history. 


**Chat_Messages Table** :  The table will consist records of every single message exchanged between a user and the chatbot.

<br>Following are the attributes for it:

<br/>a. MessageId ( Primary Key ): A unique identifier for each messages happened between a bot and user.

<br />b. UserId ( Foreign Key ): References the ID of the user in the Mst_Usr_tbl table.

<br />c. ChatId ( Foreign Key ): References the ID of the user in Chat_History table.

<br>d. Message_Content: The actual text content of the message, what the user or chatbot typed.

<br>e. Send date time: This captures the timestamp of when the message was sent.

<br>f. Send by: This indicates who sent the message, either the user or the chatbot (denoted by "user" or "chatbot").

<br>g. Status: Indicate the message delivery status (sent, delivered, read).



