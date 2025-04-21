import React, { useEffect, useState } from "react";

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const fetchDog = () => {
    setIsLoading(true);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        setDogImage(data.message);
        setIsLoading(false);
      });
  };

  const addToFavorites = () => {
    if (!favorites.includes(dogImage)) {
      const updated = [...favorites, dogImage];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="app">
      <h1>Random Dog Viewer</h1>
      <div className="card">
      {isLoading ? (
        <>
            <p>Loading...</p>
            <div className="spinner"></div>
        </>
        ) : (
          <>
            <img src={dogImage} alt="A Random Dog" />
            <div className="actions">
              <button onClick={fetchDog}>Get New Dog</button>
              <button onClick={addToFavorites}>Save to Favorites</button>
            </div>
          </>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="favorites">
          <h2>Saved Favorites</h2>
          <button className="clear-btn" onClick={clearFavorites}>
            Clear Favorites
          </button>
          <div className="gallery">
            {favorites.map((img, index) => (
              <img key={index} src={img} alt={`Favorite dog ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
