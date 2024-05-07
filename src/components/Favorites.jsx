import React from 'react';
import PhotoDisplay from './PhotoDisplay.js';

const Favorites = ({favoritePhotos,deleteFavorite, handleDownload, handleShare, openLightbox}) => {
  
  return (
    <div className="">  
      <main>
        <section className="photos">
          <div className="photos-center">
          {
              favoritePhotos.map((image,index)=>{
                return(
                  <PhotoDisplay 
                    photo={image} 
                    index={index} 
                    favoritePhotos={favoritePhotos} 
                    handleOpenLightbox={openLightbox} 
                    handleFavorites={deleteFavorite} 
                    handleDownload={handleDownload} 
                    handleShare={handleShare}
                  />
                );
              })
            
            }

          
          </div>
        </section>
      </main>
    </div>
  )
}

export default Favorites