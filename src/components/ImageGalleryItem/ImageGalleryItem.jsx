import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onImageClick } = this.props;
    return (
      <li className={styles.galleryItem} onClick={() => onImageClick(image.largeImageURL)}>
        <img src={image.webformatURL} alt="" className={styles.image} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
