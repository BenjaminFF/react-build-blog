import post from '@view/post'
import home from '@view/home'
import categories from '@view/categories'
import tags from '@view/tags'
import about from '@view/about'

const routes = [
  {
    path: '/',
    exact: true,
    name: 'index',
    component: home,
  },
  {
    path: '/post/:postId',
    name: 'post',
    exact: true,
    component: post,
  },
  // {
  //   path: '/categories',
  //   name: 'categories',
  //   exact: true,
  //   component: categories,
  // },
  {
    path: '/tags',
    name: 'tags',
    exact: false,
    component: tags,
  },
  {
    path: '/about',
    name: 'about',
    exact: true,
    component: about,
  },
];

export default routes;