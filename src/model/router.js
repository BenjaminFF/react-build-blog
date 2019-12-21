import postPage from '@view/post'
import main from '@view/main'

const routes = [
  {
    path: '/',
    exact: true,
    name: 'index',
    component: main,
  },
  {
    path: '/:postName',
    name: 'post',
    exact: true,
    component: postPage,
  },
  
];

export default routes;