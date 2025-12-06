const axios = require('axios');

async function getPopularPosts() {
  try {
    if (process.env.GA_API_ENDPOINT) {
      const response = await axios.get(process.env.GA_API_ENDPOINT);
      return response.data;
    }
    
    return [];    
  } catch (e) {
    console.log(`Error getting popular posts: `, e);
    return [];
  }
}

module.exports = (async () => {
  return await getPopularPosts();
})();
