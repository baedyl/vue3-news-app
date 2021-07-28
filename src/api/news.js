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
    // If the source is present, use it instead
    const sourceParam = source ? "sources=" + source : "country=us";

    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?" +
        sourceParam +
        "&apiKey=" +
        newsApiKey
    );
    newsData = await response.json();
    return newsData?.articles;
  },

  async searchNews(searchText, source = null) {
    // Search the most recent headlines
    const searchSource = source ? "sources=" + source : "country=us";

    if (searchText) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?${searchSource}&q=${searchText}&apiKey=${newsApiKey}`
      );
      newsData = await response.json();
      return newsData?.articles;
    } else {
      return this.getNews(source);
    }
  },

  async getSources() {
    // Get the headlines sources
    const response = await fetch(
      "https://newsapi.org/v2/sources?apiKey=" + newsApiKey
    );
    newsSources = await response.json();
    return newsSources;
  },

  async wrongApiCall() {
    // Make a wrong API call
    let error = null;
    await fetch("https://newsapi.org/v2/sources?apiKey").then((response) => {
      error = response.json();
    });
    return error;
  },
};
