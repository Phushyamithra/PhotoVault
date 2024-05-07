import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import PhotoDisplay from './PhotoDisplay';

const Photos = ({isLightboxOpen, lightboxIndex, searchQuery , handleFavorites,favoritePhotos,photos, setPhotos, handleShare, handleDownload, openLightbox,closeLightbox}) => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  // Fetch images when the component mounts and when the `page` state changes
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const clientId = '?client_id=K4AHK5wBryklB6at52twA7aglFAItcnkXpXmwHuFfqk';
      let url = `https://api.unsplash.com/photos/${clientId}`;
  
      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos/${clientId}&query=${searchQuery}`;
      }
  
      url += `&page=${page}`;  // Ensure `page` is considered for infinite scroll
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setPhotos((prevPhotos) => [...prevPhotos, ...data]);  // Append new data
        } else if (Array.isArray(data.results)) {
          setPhotos(data.results);  // Handle search results
        } else {
          console.error("Unexpected data structure:", data);  // Log unexpected structure
        }
  
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
  
    fetchImages();
  }, [page,searchQuery]);  // Trigger fetch when `page` changes

  // Infinite scroll event listener with correct dependencies
  useEffect(() => {
    const handleScroll = () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
        setPage((prev) => prev + 1);  // Increase the page number to fetch more data
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);  // Cleanup event listener
    };
  }, [loading]);  // Ensure it reacts to `loading` changes

  // Handling lightbox
  const handleOpenLightbox = (index) => {
    openLightbox(index);
  };

  const handleCloseLightbox = () => {
    closeLightbox();
  };


  return (
    <main>
      <section className="photos">
        <div className="photos-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            photos.map((photo, index) => (
              <PhotoDisplay 
                photo={photo} 
                index={index} 
                favoritePhotos={favoritePhotos} 
                handleOpenLightbox={handleOpenLightbox} 
                handleFavorites={handleFavorites} 
                handleDownload={handleDownload} 
                handleShare={handleShare}
              />
            ))
          )}
        </div>
      </section>
      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[lightboxIndex].urls.full}
          onCloseRequest={handleCloseLightbox}
        />
      )}
    </main>
  );
};

export default Photos;
