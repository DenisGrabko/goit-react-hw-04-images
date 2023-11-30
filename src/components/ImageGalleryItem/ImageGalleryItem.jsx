import React, { useState } from 'react';
import Modal from '../Modal/Modal'; 

function ImageGalleryItem({ image }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  }

  return (
    <div className="photo-one-card card" style={{ width: '18rem' }}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="card-img-top"
        loading="lazy"
        width="500px"
        height="250px"
        onClick={toggleModal}
        style={{ cursor: 'pointer' }}
      />

      {isModalOpen && (
        <Modal
          imageURL={image.largeImageURL}
          onClose={() => toggleModal()}
          image={image} 
        />
      )}

      <div className="info card-body">
        <p className="info-item card-text">
          <b>Likes:</b> {image.likes}
        </p>
        <p className="info-item card-text">
          <b>Views:</b> {image.views}
        </p>
        <p className="info-item card-text">
          <b>Comments:</b> {image.comments}
        </p>
        <p className="info-item card-text">
          <b>Downloads:</b> {image.downloads}
        </p>
      </div>
    </div>
  );
}

export default ImageGalleryItem;


