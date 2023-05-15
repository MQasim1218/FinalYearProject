import React, { useEffect, useState } from 'react';
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import Header from '../../components/ChatComponents/CustomHeader';
import StandardMessageForm from '../../components/ChatComponents/StandardMessageForm';


const Chat = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(true);



    const chatProps = useMultiChatLogic(
        process.env.REACT_APP_PROJECT_ID,
        user?.user?.email,
        user?.user?.chatId,

    )

    console.log(chatProps)


    useEffect(() => {
      let socket = new WebSocket(
        `wss://api.chatengine.io/person/?publicKey=${process.env.REACT_APP_PROJECT_ID}&username=${user?.user?.email}&secret=${user?.user?.chatId}`
    );
    socket.onopen = (event) => console.log(event);
    socket.onclose = (event) => console.log(event);
    socket.onmessage = (event) => console.log(event);
    socket.onerror = (error) => console.log(error);

      if (chatProps) {
        setLoading(false);
      }
    }, [chatProps]);
  
    const handleWindowReady = () => {
      setWindowReady(true);
    };
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!chatProps || chatProps.username === null) {
      return <div>Username is null</div>;
    }
    console.log(chatProps);
   

  return (
    <div style={{flexBasis: "100%"}}>
        <MultiChatSocket {...chatProps}/>
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => (<Header chat={chat} />)}
        renderMessageForm={(props) => (
          <StandardMessageForm props={props} activeChat={chatProps.chat} />
        )}
      />
    </div>
  )
}

export default Chat