import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ imageURL, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);


 
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-background')) {
      onClose();
    }
  };  

    return (
      <div className="modal-background" onClick={handleBackgroundClick}>
            <div className="modal">
                { /* eslint-disable-next-line */ }
          <img src={imageURL} alt="Large Image"  />  
        </div>
      </div>
    );
  
}

export default Modal;