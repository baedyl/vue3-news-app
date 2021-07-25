/**
 * News API Requests
 */
let newsData = [];
let newsSources = [];
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

export default {
  async getNews(source = null) {
    // Get the most recent headlines,
    // From the us by default
    let sourceParam = "country=us";
    if (source) {
      // If the source is present, use it instead
      sourceParam = "sources=" + source;
    }
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?" +
        sourceParam +
        "&apiKey=" +
        newsApiKey
    );
    newsData = await response.json();
    return newsData?.articles;
  },

  async searchNews(searchText) {
    // Search the most recent headlines
    if (searchText) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${searchText}&apiKey=${newsApiKey}`
      );
      newsData = await response.json();
      return newsData?.articles;
    } else {
      return this.getNews()
    }
  },

  async getSources() {
    // Get the headlines ssources
    const response = await fetch(
      "https://newsapi.org/v2/sources?apiKey=" + newsApiKey
    );
    newsSources = await response.json();
    return newsSources;
  },
};
