import React from 'react';
import Modal from 'react-modal';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import zIndex from '@mui/material/styles/zIndex';
import { Height } from '@mui/icons-material';

Modal.setAppElement('#root');


function AlertModal({ isOpen, onClose, message }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const modalStyle = {
      overlay: {
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: '9999'
      },
      content: {
        backgroundColor: colors.primary[400],
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        padding: '10px',
        maxWidth: '300px',
        margin: '0 auto',
        maxHeight: '200px',
        top: '40%',
        left: '30%',
        transform: 'translate(-40%, -30%)'
      }
    };
  
    const closeButtonStyle = {
      top: '50px',
      right: '50px',
      backgroundColor: colors.greenAccent[400],
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      color: colors.primary[500],
      borderRadius: '8px',
      margin: '10px, 10px, 0, 0'
    };
  
    const messageStyle = {
      fontSize: '20px',
      marginBottom: '30px'
    };

    const headStyle = {
        fontSize: '24px',
        marginBottom: '0',
        color: colors.greenAccent[400]
      };
  
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Donation Modal"
        style={modalStyle}
      >
        <p style={headStyle}>Success!</p>
        <p style={messageStyle}>{message}</p>
        <button style={closeButtonStyle} onClick={onClose}>
          OK
        </button>
      </Modal>
    );
  }

export default AlertModal;