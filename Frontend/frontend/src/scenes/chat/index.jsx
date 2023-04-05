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
      
        <MultiChatWindow {...chatProps} style={{height: "100vh"}} renderChatHeader={(chat) => <Header chat={chat}/>} 
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