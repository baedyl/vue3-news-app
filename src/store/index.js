import { createStore, createLogger } from 'vuex'
import headlines from './modules/headlines'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    headlines
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})