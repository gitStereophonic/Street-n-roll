// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { WelcomePage, DataPickUp } from './';

export default {
  path: '/',
  name: 'Главная',
  childRoutes: [
    {
      path: 'welcome-page',
      name: 'Welcome page',
      component: WelcomePage,
      isIndex: true,
      autoIndexRoute: true,
    },
    {
      path: 'this-is-private-data-pick-up-page-for-Olga',
      name: 'Data pick up',
      component: DataPickUp,
      autoIndexRoute: true,
    },
  ],
};
