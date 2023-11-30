import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchItemsByTag } from '../components/Find.photo.api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import Modal from '../components/Modal/Modal';

class App extends Component {
  state = {
    isLoading: false,
    error: '',
    searchQuery: '',
    page: 1,
    imagesArray: [],
    loadMoreActive: false,
    showModal: false,
    currentImageUrl: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages(this.state.searchQuery, this.state.page);
    }
  };

  openModal = (imageUrl) => {
    this.setState({ showModal: true, currentImageUrl: imageUrl });
  };

  closeModal = () => {
    this.setState({ showModal: false, currentImageUrl: '' });
  };

  formSubmitHandler = (searchQuery) => {
    this.setState({ isLoading: true, searchQuery, page: 1, imagesArray: [] });
  };

  fetchImages = (searchQuery, page) => {
    fetchItemsByTag(searchQuery, page)
      .then((newImagesArray) => {
        if (newImagesArray.length === 0) {
          Notiflix.Notify.failure('No images found.');
        } else {
          this.setState((prevState) => {
            return {
              imagesArray: [...prevState.imagesArray, ...newImagesArray],
              loadMoreActive: newImagesArray.length === 12,
            };
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        Notiflix.Notify.failure('Error fetching images.');
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMoreHandler = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { imagesArray, isLoading, showModal, currentImageUrl, loadMoreActive } = this.state;

    return (
      <div className="app">
        {isLoading && <Loader />}
        <SearchBar formSubmitHandler={this.formSubmitHandler} />
        <ImageGallery imagesArray={imagesArray} openModal={this.openModal} />
        <Button loadMoreActive={loadMoreActive} imagesArray={imagesArray} loadMoreHandler={this.loadMoreHandler} />
        {showModal && <Modal imageURL={currentImageUrl} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
