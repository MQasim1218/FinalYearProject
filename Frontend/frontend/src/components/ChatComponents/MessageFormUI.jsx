import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const MessageFormUI = ({ setAttachment, message, handleChange, handleSubmit, handleKeyDown }) => {
  
  const [preview, setPreview] = useState("")

  const localHandleKeyDown = (event)=> {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default action of submitting the form
        handleKeyDown();
        setPreview("")
    }
  }
  
    return (
    <div className='message-form-container'>
        {preview && (
            <div className='message-form-preview'>
                <img alt="message-form-preview" className='message-form-preview-image' src={preview} onLoad={() => URL.revokeObjectURL(preview)} />
                <CloseOutlinedIcon className="message-form-icon-x" onClick={ () => {
                setPreview("")
                setAttachment("")
                }} />
            </div>
        )}
        <div className='message-form'>
            <div className='message-form-input-container'>
                <input className='message-form-input' type="text" value={message} onChange={handleChange} onKeyDown={localHandleKeyDown} placeholder="Message"/>
            </div>
            <div className='message-form-icons'>
                <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false} noClick={true} onDrop={(acceptedFiles) => {
                    setAttachment(acceptedFiles[0])
                    setPreview(URL.createObjectURL(acceptedFiles[0]))
                }}>
                    {({ getRootProps, getInputProps, open }) => (
                        <div {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <AttachFileOutlinedIcon className="message-form-icon-clip" onClick={open}/>
                        </div>
                    )}
                    </Dropzone>
                    
                    <hr className='vertical-line' />
                    <SendOutlinedIcon className='message-form-icon-airplane' onClick={()=>{
                        setPreview("")
                        handleSubmit()
                    }}
                    />
            </div>
        </div>
    </div>
  )
}

export default MessageFormUI