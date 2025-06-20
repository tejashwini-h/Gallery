// services/flickrService.js
const API_URL = 'https://api.flickr.com/services/rest/';
const API_KEY = '6f102c62f41998d151e5a1b48713cf13';

export const fetchRecentImages = async () => {
  try {
    const res = await fetch(`${API_URL}?method=flickr.photos.getRecent&per_page=20&page=1&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s`);
    const json = await res.json();
    return json.photos.photo;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return [];
  }
};
