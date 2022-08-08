import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faToggleOff, faToggleOn, faUserSecret, faLaptopCode, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub, faInstagram, faTwitter, faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'   
import devicon  from 'devicon'

// begin:: assets
import './assets/app.css'
// end:: assets

library.add(faToggleOff, faToggleOn, faUserSecret, faLaptopCode, faDiscord, faGithub, faFileArrowDown, faInstagram, faTwitter, faFacebook, faLinkedin)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')