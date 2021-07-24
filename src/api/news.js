/**
 * News API Requests
 */
let newsData = [];
let newsSources = [];

export default {
  async getNews() {
    // Get the most recent headlines
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e"
    );
    newsData = await response.json();
    return newsData?.articles;
  },

  async getSources() {
    // Get the headlines ssources
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=099148be22804e849a0c6fe022b7cf5e"
    );
    newsSources = await response.json();
    return newsSources;
  },
};
