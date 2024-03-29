import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '../store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {         
    
  //check if route or parent route has middleware    
  if (!to.matched.some(record => record.meta.middleware)) {    
      return next()
  }    

  //extract the middleware
  const {meta} = to.matched.find(record => record.meta.middleware);     

  const context = {
      to,
      from,
      next,
      store
  }  

  return meta.middleware[0]({
      ...context
  })      

});

export default router