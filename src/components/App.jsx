import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { fetchItemsByTag } from '../components/Find.photo.api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import Modal from '../components/Modal/Modal';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);  
  const [imagesArray, setImagesArray] = useState([]);
  const [loadMoreActive, setLoadMoreActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }  
    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  const openModal = (imageUrl) => {
    setShowModal(true);
    setCurrentImageUrl(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentImageUrl('');
  };

  const formSubmitHandler = (searchQuery) => {
    setIsLoading(true);
    setSearchQuery(searchQuery);
    setPage(1);
    setImagesArray([]);
  };

  const fetchImages = (searchQuery, pageNumber) => {
    fetchItemsByTag(searchQuery, pageNumber)
      .then((newImagesArray) => {
        if (newImagesArray.length === 0) {
          Notiflix.Notify.failure('No images found.');
        } else {
          setImagesArray((prevImages) => [...prevImages, ...newImagesArray]);
          setLoadMoreActive(newImagesArray.length === 12);
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        Notiflix.Notify.failure('Error fetching images.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMoreHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      {isLoading && <Loader />}
      <SearchBar formSubmitHandler={formSubmitHandler} />
      <ImageGallery imagesArray={imagesArray} openModal={openModal} />
      <Button loadMoreActive={loadMoreActive} imagesArray={imagesArray} loadMoreHandler={loadMoreHandler} />
      {showModal && <Modal imageURL={currentImageUrl} onClose={closeModal} />}
    </div>
  );
};

export default App;



// import React, { Component } from 'react';
// import Notiflix from 'notiflix';
// import { fetchItemsByTag } from '../components/Find.photo.api';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import SearchBar from './SearchBar/SearchBar';
// import Loader from './Loader/Loader';
// import Modal from '../components/Modal/Modal';

// class App extends Component {
//   state = {
//     isLoading: false,
//     error: '',
//     searchQuery: '',
//     page: 1,
//     imagesArray: [],
//     loadMoreActive: false,
//     showModal: false,
//     currentImageUrl: '',
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchImages(this.state.searchQuery, this.state.page);
//     }
//   };

//   openModal = (imageUrl) => {
//     this.setState({ showModal: true, currentImageUrl: imageUrl });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, currentImageUrl: '' });
//   };

//   formSubmitHandler = (searchQuery) => {
//     this.setState({ isLoading: true, searchQuery, page: 1, imagesArray: [] });
//   };

//   fetchImages = (searchQuery, page) => {
//     fetchItemsByTag(searchQuery, page)
//       .then((newImagesArray) => {
//         if (newImagesArray.length === 0) {
//           Notiflix.Notify.failure('No images found.');
//         } else {
//           this.setState((prevState) => {
//             return {
//               imagesArray: [...prevState.imagesArray, ...newImagesArray],
//               loadMoreActive: newImagesArray.length === 12,
//             };
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching images:', error);
//         Notiflix.Notify.failure('Error fetching images.');
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   loadMoreHandler = () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { imagesArray, isLoading, showModal, currentImageUrl, loadMoreActive } = this.state;

//     return (
//       <div className="app">
//         {isLoading && <Loader />}
//         <SearchBar formSubmitHandler={this.formSubmitHandler} />
//         <ImageGallery imagesArray={imagesArray} openModal={this.openModal} />
//         <Button loadMoreActive={loadMoreActive} imagesArray={imagesArray} loadMoreHandler={this.loadMoreHandler} />
//         {showModal && <Modal imageURL={currentImageUrl} onClose={this.closeModal} />}
//       </div>
//     );
//   }
// }

// export default App;
