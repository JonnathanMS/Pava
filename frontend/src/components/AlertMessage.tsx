import React, { useState } from 'react';

interface AlertMessageProps {
  title: string;
  message: string;
  titleColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  message,
  titleColor = 'black',
  textColor = 'black',
  backgroundColor = 'white',
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const alertStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: isAccepted ? 'none' : 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: backgroundColor,
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '80%',
  };

  const titleStyle: React.CSSProperties = {
    color: titleColor,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontSize: '1.5rem',
    marginBottom: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleAccept = () => {
    setIsAccepted(true);
  };

  return (
    <div style={alertStyle}>
      <div style={contentStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={textStyle}>{message}</div>
        <button style={buttonStyle} onClick={handleAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default AlertMessage;