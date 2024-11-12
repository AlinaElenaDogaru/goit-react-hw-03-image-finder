import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './SearchBar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: ''
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ loading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=45476172-6bbda7ba5ec4a4fe36c5c9968&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        loading: false
      }));
    } catch (error) {
      console.error(error);
      this.setState({ loading: false });
    }
  };

  handleSearchSubmit = (newQuery) => {
    this.setState({ query: newQuery, images: [], page: 1 });
  };

  handleLoadMore = () => { this.setState(prevState => ({ page: prevState.page + 1 })); };
  handleImageClick = (largeImageURL) => { this.setState({ largeImageURL, showModal: true }); };
  closeModal = () => { this.setState({ showModal: false, largeImageURL: '' }); };
  render() {
    const { images, loading, showModal, largeImageURL } = this.state;
    return (<div className={styles.App}>
      <Searchbar onSubmit={this.handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={this.handleImageClick} />
      {loading && <Loader />} {images.length > 0 && !loading && <Button onClick={this.handleLoadMore} />}
      {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />} </div>);
  }
}
export default App;