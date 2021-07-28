// API queries
import news from "../../api/news";

// INITIAL STATE
const state = () => ({
  news: [],
  history: [],
  articleDetails: null,
  loading: false,
  historyLength: 5
});

// GETTERS
const getters = {
  allHeadlines: (state) => {
    return state.news;
  },
  articleDetails: (state) => {
    return state.articleDetails;
  },
  loadingState: (state) => {
    return state.loading;
  },
  historyHeadlines: (state) => {
    return state.history;
  },
};

// MUTATIONS
const mutations = {
  setNews(state, news) {
    // Fills in the headlines with a human readable date format
    state.news = news.map((article) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      article.publishedAt = new Date(article.publishedAt).toUTCString(
        undefined,
        options
      );
      return article;
    });
    state.loading = false;
  },
  setHeadlineDetails(state, params) {
    const { details, log } = { ...params }
    // Fills in the current headline
    state.articleDetails = details;
    if (log) {
    // Fills in the history of headlines
    const historyLength = state.history.length;
    if (historyLength >= state.historyLength) {
      state.history.shift();
    }
      state.history.push(details);
    }
  },
  setHeadlineTitle(state, params) {
    // Updates a headline's title
    const { title, index } = { ...params };
    state.news[index].title = title;
  },
  setLoading(state, value) {
    // Fills in the loading state
    state.loading = value;
  },
};

// ACTIONS
const actions = {
  async getNewsData({ commit }, source) {
    commit("setLoading", true);
    const newsData = source ? await news.getNews(source) : await news.getNews();
    commit("setNews", newsData);
  },
  async searchNewsData({ commit }, params) {
    const { searchText, source } = { ...params }
    commit("setLoading", true);
    const newsData = await news.searchNews(searchText, source);
    commit("setNews", newsData);
  },
  async getCurrentHeadline({ state, commit, dispatch }, params) {
    const { title, log } = { ...params }
    if (state.news.length < 1) {
      // In case the news array is empty,
      // Let's fetch the data
      await dispatch("getNewsData");
    }
    const article = state.news.filter((article) => article.title === title)[0];
    commit("setHeadlineDetails", { details: article, log });
  },
  updateHeadlineTitle({ state, commit }, params) {
    for (let index = 0; index < state.news.length; index++) {
      // We find the headline having the same title
      if (state.news[index].title === params.currentTitle) {
        // Change the headline title
        commit("setHeadlineTitle", {
          title: params.newTitle,
          index,
        });
        break;
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
