// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { WelcomePage, TestPage } from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    {
      path: 'welcome-page',
      name: 'Welcome page',
      component: WelcomePage,
      isIndex: true,
      autoIndexRoute: true,
    },
    { path: 'test-page', name: 'Test page', component: TestPage },
  ],
};
