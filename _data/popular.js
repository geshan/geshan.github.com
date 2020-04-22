const axios = require('axios');

async function getPopularPosts() {
  try {
    const response = await axios.get(process.env.GA_API_ENDPOINT);
    return response.data;
  } catch (e) {
    console.log(`Error getting popular posts: `, e);
    return [];
  }
}

module.exports = (async () => {
  return await getPopularPosts();
})();
