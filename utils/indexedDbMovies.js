const DB_NAME = "moviesDB";
const DB_VERSION = 1;
const MOVIES_STORE_NAME = "movies";
const DETAIL_STORE_NAME = "movieDetails";
const REVIEWS_STORE_NAME = "reviews";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(MOVIES_STORE_NAME)) {
        db.createObjectStore(MOVIES_STORE_NAME, { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains(DETAIL_STORE_NAME)) {
        db.createObjectStore(DETAIL_STORE_NAME, { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains(REVIEWS_STORE_NAME)) {
        db.createObjectStore(REVIEWS_STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const addDataToDB = async (storeName, data) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  store.put(data);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

const getDataFromDB = async (storeName, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result.find((item) => item.key === key));
    request.onerror = () => reject(request.error);
  });
};

const addMoviesToDB = (key, movies) => addDataToDB(MOVIES_STORE_NAME, { key, movies });
const getMoviesFromDB = (key) => getDataFromDB(MOVIES_STORE_NAME, key);

const addMovieDetailToDB = (key, movieDetail) => addDataToDB(DETAIL_STORE_NAME, { key, movieDetail });
const getMovieDetailFromDB = (id) => getDataFromDB(DETAIL_STORE_NAME, id);

const addReviewToDB = (key, reviews) => addDataToDB(REVIEWS_STORE_NAME, { key, reviews });
const getReviewsFromDB = (movieId) => getDataFromDB(REVIEWS_STORE_NAME, movieId);

const openDatabase = (dbName, version) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const getObjectStore = (db, storeName, mode) => {
  const transaction = db.transaction([storeName], mode);
  return transaction.objectStore(storeName);
};

const getRequest = (store) => {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const putRequest = (store, value) => {
  return new Promise((resolve, reject) => {
    const request = store.put(value);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

const removeReviewsFromDB = async (movieId, reviewIndex = 0) => {
  try {
    const db = await openDatabase(DB_NAME, DB_VERSION);
    const store = getObjectStore(db, REVIEWS_STORE_NAME, "readwrite");
    const movies = await getRequest(store);
    const movie = movies.find((item) => item.key === movieId);

    if (movie && Array.isArray(movie.reviews)) {
      movie.reviews.splice(reviewIndex, 1);

      await putRequest(store, movie);
      console.log("Review removed and movie updated successfully.");
    } else {
      console.error("Movie not found or reviews is not an array.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export {
  addReviewToDB,
  getReviewsFromDB,
  removeReviewsFromDB,
  addMoviesToDB,
  getMoviesFromDB,
  addMovieDetailToDB,
  getMovieDetailFromDB,
};
