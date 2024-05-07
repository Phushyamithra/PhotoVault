import React from 'react'
import { FaDownload,FaShare, FaHeart, FaThumbsUp } from 'react-icons/fa'
const PhotoDisplay = ({photo,index,favoritePhotos,handleOpenLightbox,handleFavorites,handleDownload,handleShare}) => {
    return (
        <article
                key={photo.id}
                className={`photo ${
                  favoritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'favorite-photo' : ''
                }`}
              >
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  onClick={() => handleOpenLightbox(index)}
                />
                <div className="photo-info">
                  <div className="photo-header">
                    <h4>{photo.user.name}</h4>
                    <button
                      className={`favorite-btn ${
                        favoritePhotos.some((favPhoto) => favPhoto.id === photo.id) ? 'active' : ''
                      }`}
                      onClick={() => handleFavorites(photo.id)}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div className="photo-actions">
                    <p><FaThumbsUp />{photo.likes}</p>
                    <button className="share-btn" onClick={() => handleShare(photo.urls.regular)}>
                      <FaShare />
                    </button>
                    <button className="download-btn" onClick={() => handleDownload(photo.urls.full, photo.id)}>
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </article>
)
}

export default PhotoDisplay