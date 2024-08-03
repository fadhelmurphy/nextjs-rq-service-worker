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
        db.createObjectStore(DETAIL_STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(REVIEWS_STORE_NAME)) {
        db.createObjectStore(REVIEWS_STORE_NAME, { keyPath: "movieId" });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const addMoviesToDB = async (key, movies) => {
  const db = await openDB();
  const transaction = db.transaction(MOVIES_STORE_NAME, "readwrite");
  const store = transaction.objectStore(MOVIES_STORE_NAME);

  store.put({ key, movies });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

const getMoviesFromDB = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MOVIES_STORE_NAME, "readonly");
    const store = transaction.objectStore(MOVIES_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () =>
      resolve(request.result.find((item) => item.key === key));
    request.onerror = () => reject(request.error);
  });
};

const addMovieDetailToDB = async (id, movieDetail) => {
  const db = await openDB();
  const transaction = db.transaction(DETAIL_STORE_NAME, "readwrite");
  const store = transaction.objectStore(DETAIL_STORE_NAME);

  store.put({ id, movieDetail });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

const getMovieDetailFromDB = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(DETAIL_STORE_NAME, "readonly");
    const store = transaction.objectStore(DETAIL_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result.find((item) => item.id === id));
    request.onerror = () => reject(request.error);
  });
};

const addReviewToDB = async (movieId, reviews) => {
  const db = await openDB();
  const transaction = db.transaction(REVIEWS_STORE_NAME, "readwrite");
  const store = transaction.objectStore(REVIEWS_STORE_NAME);

  store.put({ movieId, reviews });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = (event) => reject(event.target.error);
  });
};

const getReviewsFromDB = async (movieId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(REVIEWS_STORE_NAME, "readonly");
    const store = transaction.objectStore(REVIEWS_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result.find((item) => item.movieId === movieId);
      resolve(result ? result.reviews : []);
    };
    request.onerror = () => reject(request.error);
  });
};

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
    const movie = movies.find((item) => item.movieId === movieId);

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
