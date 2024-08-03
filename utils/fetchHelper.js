const CUSTOM_KEY = 'your-custom-key'; // Define your custom key here

/**
 * Generic fetch function with custom headers
 * @param {string} url - The URL to fetch
 * @param {object} options - Additional fetch options (method, body, etc.)
 * @returns {Promise<object>} - The JSON response
 */
const fetchHelper = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-custom-key': CUSTOM_KEY, // Add the custom header
    },
  });

  if (!response.ok) {
    return null
    // throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export default fetchHelper;
