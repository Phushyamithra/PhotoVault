import './App.css';
import React from 'react';
import Photos from './components/Photos';
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js'
import { useState } from 'react';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State to hold the current search query
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    // Handling share
    const handleShare = (photoUrl) => {
      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURI(`Check out this image: ${photoUrl}`)}`;
      window.open(shareUrl, '_blank');
    };
  
    // Handle download
    const handleDownload = (photoUrl, photoId) => {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = `photo_${photoId}.jpg`;
      link.click();
    };

  const favoritesHandle = (photoId) => {
    const index = favoritePhotos.findIndex((favPhoto) => favPhoto.id === photoId);

    if (index !== -1) {
      // Remove from favorites
      setFavoritePhotos((prev) => prev.filter((favPhoto) => favPhoto.id !== photoId));
    } else {
      // Add to favorites
      const photoToAdd = photos.find((photo) => photo.id === photoId);
      setFavoritePhotos((prev) => [...prev, photoToAdd]);
    }
  }

    // Handling lightbox
    const openLightbox = (index) => {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    };
  
    const closeLightbox = () => {
      setIsLightboxOpen(false);
    };
  


  return (
    <Router>
      <div>
        <Header setSearchQuery={setSearchQuery} /> 
        <Routes>
          <Route path="/" element={<Photos 
            isLightboxOpen={isLightboxOpen}
            lightboxIndex={lightboxIndex}
            openLightbox={openLightbox}  // Ensure correct prop passing
            closeLightbox={closeLightbox}  // Ensure correct prop passing
            searchQuery={searchQuery} 
            handleFavorites ={favoritesHandle} 
            favoritePhotos={favoritePhotos} 
            photos={photos} 
            setPhotos={setPhotos} 
            handleDownload={handleDownload} 
            handleShare={handleShare}  
          />} />  

          <Route path="/favorites" element={<Favorites 
            favoritePhotos={favoritePhotos} 
            deleteFavorite = {favoritesHandle} 
            isLightboxOpen={isLightboxOpen}
            handleDownload={handleDownload} 
            handleShare={handleShare} 
            lightboxIndex={lightboxIndex}
            openLightbox={openLightbox} 
          />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

