import React, { useEffect, useState } from 'react';
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import Header from '../../components/ChatComponents/CustomHeader';
import Ai from '../../components/ChatComponents/Ai';
import StandardMessageForm from '../../components/ChatComponents/StandardMessageForm';
import { useSelector } from 'react-redux';



const Chat = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [loading, setLoading] = useState(true);
  // console.log('json stringigfy user', JSON.parse(user))


    const chatProps = useMultiChatLogic(
        process.env.REACT_APP_PROJECT_ID,
        user.user.email,
        user.user.chatId,
        // 'aow@gmail.com',
        // '123'
    )

    console.log(chatProps)


    useEffect(() => {
      let socket = new WebSocket(
        `wss://api.chatengine.io/person/?publicKey=${process.env.REACT_APP_PROJECT_ID}&username=${user.user.email}&secret=${user.user.chatId}`
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
    // if (chatProps.activeChatId === undefined) {
    //   return <div>Loading chat data...</div>;
    // }
   

  return (
    <div style={{flexBasis: "100%"}}>
        <MultiChatSocket {...chatProps}/>
      
        <MultiChatWindow projectId={chatProps.projectId}
      username={chatProps.username}
      secret={chatProps.secret}
      onAuthFail={chatProps.onAuthFail}
      onNewChat={chatProps.onNewChat}
      onEditChat={chatProps.onEditChat}
      onDeleteChat={chatProps.onDeleteChat}
      onNewMessage={chatProps.onNewMessage}
      onEditMessage={chatProps.onEditMessage}
      onDeleteMessage={chatProps.onDeleteMessage}
      onIsTyping={chatProps.onIsTyping} style={{height: "100vh"}} renderChatHeader={(chat) => <Header chat={chat}/>} 
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")){
            return <Ai props={props} activeChat={chatProps.chat}/>
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
        />
    </div>
  )
}

export default Chat