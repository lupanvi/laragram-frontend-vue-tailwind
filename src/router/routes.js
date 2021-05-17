import Home from '@/pages/Home'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import PostEdit from '@/pages/Posts/PostEdit'
import PostNew from '@/pages/Posts/PostNew'
import CommentsList from '@/pages/Comments'
import guest from './middleware/guest'
import auth from './middleware/auth'

export default [  	
    {
      path: "/",
      name: "home",      
      component: Home,
      meta: {
        middleware: [ auth ]
      }          
    }, 
    { 
      path: '/posts/edit/:id', 
      component: PostEdit,       
      name: 'posts.edit',
      props: true,
      meta: {
        middleware: [ auth ]
      }
    },
    { 
      path: '/posts/create', 
      component: PostNew,       
      name: 'posts.create',
      props: true,      
      meta: {
        middleware: [ auth ]
      }
    },
    {
      path:'/posts/:id/comments',
      component: CommentsList,      
      name:'comments.index',
      props: true,
      meta: {
        middleware: [ auth ]
      }
    },
    { 
    	path: '/login',               
    	component: Login, 
    	name:'login',            
      meta: {
        middleware: [ guest ]
      }
    },
    { 
    	path: '/register',        
    	component: Register, 
    	name: 'register',      
      meta: {
        middleware: [ guest ]
      }
    }    
  ]