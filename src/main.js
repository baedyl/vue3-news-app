import { createApp } from 'vue'
import router from "./router";
import vuetify from './plugins/vuetify'
import Headlines from './views/Headlines.vue' 

const app = createApp(Headlines)
app.use(router)
app.use(vuetify)

app.mount('#app')
