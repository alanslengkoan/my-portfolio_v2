import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Base from '../layouts/Base.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ChannelsView from '../views/ChannelsView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import StacksView from '../views/StacksView.vue'
import PdfView from '../views/PdfView.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/base',
      component: Base,
      children: [{
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about-me',
          name: 'about',
          component: AboutView
        },
        {
          path: '/projects',
          name: 'projects',
          component: ProjectsView
        },
        {
          path: '/stacks',
          name: 'stacks',
          component: StacksView
        },
        {
          path: '/channels',
          name: 'channels',
          component: ChannelsView
        },
      ]
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: PdfView
    },
    {
      path: '/:notFound(.*)',
      redirect: '/home'
    }
  ],
})

export default router