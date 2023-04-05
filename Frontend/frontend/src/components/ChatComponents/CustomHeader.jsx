import React from 'react'
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const CustomHeader = ({ chat }) => {

  return (
    <div className='chat-header'>
        <div className='flexbetween'>
            <ForumOutlinedIcon className='icon-chat'/>
            <h3 className='header-text'>{chat.title}</h3>
        </div>
        <div className='flexbetween'>
            {chat.description !== "⬅️ ⬅️ ⬅️" ? 
            (<p className='header-text'>{chat.description}</p>) : 
                (<p className='header-text'>No chat selected</p>)}
                
        </div>
    </div>
  )
}

export default CustomHeader