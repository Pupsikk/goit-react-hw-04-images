import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <li className={s.item} onClick={toggleModal}>
        <img className={s.image} src={src} alt={tags} />
      </li>
      {showModal && (
        <Modal
          onCloseModal={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
