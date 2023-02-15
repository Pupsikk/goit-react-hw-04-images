import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FETCH_STATUS } from '../constants/fetchStatus';
import { getPictures } from 'services/pictures.service';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState(FETCH_STATUS.Empty);

  const prepareMakeRequest = word => {
    setPictures([]);
    setRequest(word.toLowerCase().trim());
    setPage(1);
    setTotalHits(FETCH_STATUS.Empty);
    setStatus(FETCH_STATUS.Empty);
  };

  useEffect(() => {
    if (!request) {
      return;
    }
    const makeRequest = async () => {
      setStatus(FETCH_STATUS.Loading);
      try {
        const receivedPictures = await getPictures(request, page);
        setTotalHits(receivedPictures.totalHits);

        if (receivedPictures.totalHits === 0) {
          Notify.warning(`No results for ${request}`);
        }
        //copy only the required properties
        const pictures = receivedPictures.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        setPictures(prevPictures => [].concat(prevPictures, pictures));
        setStatus(FETCH_STATUS.Success);
      } catch (error) {
        setStatus(FETCH_STATUS.Error);
        console.log(error.message);
        Notify.failure('Something went wrong!');
      }
    };

    makeRequest();
  }, [request, page]);

  const setRequestWord = word => {
    if (word === '') {
      Notify.info('The input field is empty!');
    } else if (word !== request) {
      prepareMakeRequest(word);
    }
  };

  const handleChangePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar search={setRequestWord} />
      {status === FETCH_STATUS.Loading && <Loader />}
      <ImageGallery imageList={pictures} />
      {pictures.length < totalHits && <Button loadMore={handleChangePage} />}
    </>
  );
};
