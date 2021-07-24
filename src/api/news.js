/**
 * News API Requests
 */
let newsData = [];
let newsSources = [];
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

export default {
  async getNews() {
    // Get the most recent headlines
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + newsApiKey
    );
    newsData = await response.json();
    return newsData?.articles;
  },

  async getSources() {
    // Get the headlines ssources
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + newsApiKey
    );
    newsSources = await response.json();
    return newsSources;
  },
};
